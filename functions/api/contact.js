const MIN_MESSAGE_LENGTH = 20;
const RESEND_ENDPOINT = 'https://api.resend.com/emails';

const USER_ERRORS = {
  ru: {
    messageShort:
      'Пожалуйста, опишите ваш запрос подробнее. Сообщение должно содержать не менее 20 символов.',
    consentMissing: 'Пожалуйста, подтвердите согласие, поставив галочку выше.',
    turnstileStale: 'Проверка безопасности устарела. Обновите страницу и попробуйте ещё раз.',
    serverError:
      'Не удалось отправить заявку. Пожалуйста, попробуйте позже или напишите напрямую на subtextaudio@gmail.com.',
    generic:
      'Не удалось отправить заявку. Пожалуйста, попробуйте позже или напишите напрямую на subtextaudio@gmail.com.',
  },
  en: {
    messageShort:
      'Please describe your request in more detail. Your message must be at least 20 characters.',
    consentMissing: 'Please confirm your consent by checking the box above.',
    turnstileStale: 'The security check has expired. Please refresh the page and try again.',
    serverError:
      'We could not send your request. Please try again later or email subtextaudio@gmail.com directly.',
    generic:
      'We could not send your request. Please try again later or email subtextaudio@gmail.com directly.',
  },
};

const ALLOWED_SERVICES = new Set([
  'AI Voiceover',
  'Audio Production',
  'Podcast Production',
  'YouTube Narration',
  'Localization',
  'Digital Services',
  'ИИ-озвучка',
  'Аудиопродакшн',
  'Подкасты',
  'Озвучка для YouTube',
  'Локализация',
  'Цифровые услуги',
]);

const JSON_HEADERS = {
  'Content-Type': 'application/json; charset=utf-8',
  'X-Content-Type-Options': 'nosniff',
};

export async function onRequestPost(context) {
  const { request, env } = context;
  let lang = 'ru';

  try {
    logEnvDiagnostics(env);

    const formData = await request.formData();
    lang = resolveLang(formData);
    const errors = userErrors(lang);

    if (String(formData.get('website') || '').trim() !== '') {
      console.warn('[contact] honeypot triggered');
      return jsonError(errors.generic, 400);
    }

    const clientIp = getClientIp(request);
    if (!(await checkRateLimit(env, clientIp))) {
      console.warn('[contact] rate limit exceeded', { clientIp });
      return jsonError(errors.generic, 429);
    }

    const turnstileToken = String(formData.get('cf-turnstile-response') || '').trim();
    if (!turnstileToken) {
      console.warn('[contact] Turnstile token missing');
      return jsonError(errors.turnstileStale, 400);
    }

    const turnstileResult = await verifyTurnstile(
      turnstileToken,
      clientIp,
      env.TURNSTILE_SECRET_KEY,
    );
    if (!turnstileResult.ok) {
      return jsonError(errors.turnstileStale, 400);
    }

    const name = sanitizeText(formData.get('name'), 100);
    const email = String(formData.get('email') || '').trim();
    const service = sanitizeText(formData.get('service'), 120);
    const message = sanitizeText(formData.get('message'), 5000);
    const consent = formData.get('consent');

    if (name.length < 2) {
      console.warn('[contact] validation failed: name too short');
      return jsonError(errors.generic, 400);
    }

    if (!isValidEmail(email)) {
      console.warn('[contact] validation failed: invalid email');
      return jsonError(errors.generic, 400);
    }

    if (!service || !ALLOWED_SERVICES.has(service)) {
      console.warn('[contact] validation failed: invalid service', { service });
      return jsonError(errors.generic, 400);
    }

    if (isMessageTooShort(message)) {
      console.warn('[contact] validation failed: message too short');
      return jsonError(errors.messageShort, 400);
    }

    if (!consent) {
      console.warn('[contact] validation failed: consent missing');
      return jsonError(errors.consentMissing, 400);
    }

    const payload = {
      name,
      email,
      service,
      message,
      submitted_at: new Date().toISOString().replace('T', ' ').replace(/\.\d{3}Z$/, ' UTC'),
      ip: clientIp,
      user_agent: sanitizeText(request.headers.get('User-Agent') || '', 500),
    };

    await sendContactEmail(env, payload);

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: JSON_HEADERS,
    });
  } catch (error) {
    logUnhandledError(error);
    return jsonError(userErrors(lang).serverError, 500);
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Accept',
      'Access-Control-Max-Age': '86400',
    },
  });
}

function jsonError(message, status) {
  return new Response(JSON.stringify({ ok: false, error: message }), {
    status,
    headers: JSON_HEADERS,
  });
}

function resolveLang(formData) {
  const lang = String(formData.get('form_lang') || '').trim().toLowerCase();
  return lang === 'en' ? 'en' : 'ru';
}

function userErrors(lang) {
  return USER_ERRORS[lang] || USER_ERRORS.ru;
}

function isMessageTooShort(message) {
  return String(message || '').trim().length < MIN_MESSAGE_LENGTH;
}

function envPresent(env, key) {
  const value = env[key];
  return typeof value === 'string' ? value.trim() !== '' : value != null && value !== '';
}

function extractEmailAddress(value) {
  const text = String(value || '').trim();
  const bracketMatch = text.match(/<([^>]+)>/);
  if (bracketMatch) {
    return bracketMatch[1].trim();
  }
  return text;
}

function extractEmailDomain(value) {
  const address = extractEmailAddress(value);
  const atIndex = address.lastIndexOf('@');
  return atIndex === -1 ? null : address.slice(atIndex + 1).toLowerCase();
}

function logEnvDiagnostics(env) {
  const from = env.CONTACT_FROM;
  const fromDomain = extractEmailDomain(from);

  console.log('[contact] env diagnostics:', {
    TURNSTILE_SECRET_KEY: envPresent(env, 'TURNSTILE_SECRET_KEY'),
    RESEND_API_KEY: envPresent(env, 'RESEND_API_KEY'),
    CONTACT_FROM: envPresent(env, 'CONTACT_FROM'),
    CONTACT_TO: envPresent(env, 'CONTACT_TO'),
    CONTACT_FROM_DOMAIN: fromDomain,
    RATE_LIMIT_BINDING: !!env.RATE_LIMIT,
  });

  if (fromDomain === 'resend.dev') {
    console.warn(
      '[contact] CONTACT_FROM uses resend.dev. Resend only allows onboarding@resend.dev to send to the Resend account owner email. Use a verified custom domain for production delivery.',
    );
  }
}

function logUnhandledError(error) {
  if (error instanceof Error) {
    console.error('[contact] unhandled exception:', {
      name: error.name,
      message: error.message,
      stack: error.stack,
    });
    return;
  }

  console.error('[contact] unhandled exception:', error);
}

function getClientIp(request) {
  const cfIp = request.headers.get('CF-Connecting-IP');
  if (cfIp) {
    return cfIp;
  }

  const forwarded = request.headers.get('X-Forwarded-For');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  return 'unknown';
}

function sanitizeText(value, maxLength) {
  let text = String(value ?? '').trim();
  text = text.replace(/<[^>]*>/g, '');
  text = text.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
  text = text.replace(/\r\n?/g, '\n');

  if (text.length > maxLength) {
    text = text.slice(0, maxLength);
  }

  return text;
}

function isValidEmail(email) {
  if (!email || email.length > 254) {
    return false;
  }

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function verifyTurnstile(token, ip, secret) {
  if (!secret) {
    console.error('[contact] Turnstile: TURNSTILE_SECRET_KEY is not configured');
    return { ok: false, errorCodes: ['missing-secret'] };
  }

  const body = new URLSearchParams({
    secret,
    response: token,
    remoteip: ip !== 'unknown' ? ip : '',
  });

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });

  let data = null;
  try {
    data = await response.json();
  } catch (error) {
    console.error('[contact] Turnstile: failed to parse response JSON', {
      httpStatus: response.status,
      error: error instanceof Error ? error.message : String(error),
    });
    return { ok: false, errorCodes: ['invalid-json'] };
  }

  const errorCodes = Array.isArray(data?.['error-codes']) ? data['error-codes'] : [];

  console.log('[contact] Turnstile verify:', {
    httpStatus: response.status,
    success: data?.success === true,
    errorCodes,
  });

  return {
    ok: response.ok && data?.success === true,
    errorCodes,
  };
}

async function checkRateLimit(env, ip) {
  if (!env.RATE_LIMIT || ip === 'unknown') {
    return true;
  }

  const maxAttempts = Number(env.RATE_LIMIT_MAX || 5);
  const windowSeconds = Number(env.RATE_LIMIT_WINDOW || 600);
  const key = `rate:${ip}`;
  const now = Math.floor(Date.now() / 1000);

  let record = { count: 0, reset_at: now + windowSeconds };
  const stored = await env.RATE_LIMIT.get(key);

  if (stored) {
    try {
      record = JSON.parse(stored);
    } catch {
      record = { count: 0, reset_at: now + windowSeconds };
    }
  }

  if (record.reset_at <= now) {
    record = { count: 0, reset_at: now + windowSeconds };
  }

  if (record.count >= maxAttempts) {
    return false;
  }

  record.count += 1;
  await env.RATE_LIMIT.put(key, JSON.stringify(record), { expirationTtl: windowSeconds });

  return true;
}

function buildEmailBody(payload) {
  return [
    'New project brief — Subtext Audio',
    '----------------------------------',
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Service: ${payload.service}`,
    `Submitted at: ${payload.submitted_at}`,
    `IP: ${payload.ip}`,
    `User-Agent: ${payload.user_agent}`,
    '',
    'Message:',
    payload.message,
  ].join('\n');
}

function resolveContactFrom(env) {
  const configured = String(env.CONTACT_FROM || '').trim();
  if (configured) {
    return configured;
  }

  return 'Subtext Audio <contact@subtextaudio.com>';
}

function resolveContactTo(env) {
  const configured = String(env.CONTACT_TO || '').trim();
  if (configured) {
    return configured;
  }

  return 'subtextaudio@gmail.com';
}

async function sendContactEmail(env, payload) {
  const apiKey = env.RESEND_API_KEY;
  const from = resolveContactFrom(env);
  const to = resolveContactTo(env);

  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not configured.');
  }

  if (!from) {
    throw new Error('CONTACT_FROM is not configured.');
  }

  if (!to) {
    throw new Error('CONTACT_TO is not configured.');
  }

  const fromDomain = extractEmailDomain(from);
  if (fromDomain === 'resend.dev') {
    console.warn(
      '[contact] Resend sender uses resend.dev domain. Delivery to external recipients such as subtextaudio@gmail.com will be rejected unless the Resend account owner email matches.',
    );
  }

  const requestBody = {
    from,
    to: [to],
    reply_to: payload.email,
    subject: `Subtext Audio — project brief from ${payload.name}`,
    text: buildEmailBody(payload),
  };

  console.log('[contact] Resend request:', {
    endpoint: RESEND_ENDPOINT,
    authorization: apiKey ? 'Bearer [present]' : 'Bearer [missing]',
    fromDomain,
    toPresent: !!to,
    replyToPresent: !!payload.email,
  });

  const response = await fetch(RESEND_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  const responseText = await response.text();

  if (!response.ok) {
    console.error('[contact] Resend error:', {
      status: response.status,
      body: responseText,
    });

    if (response.status === 403 && fromDomain === 'resend.dev') {
      console.error(
        '[contact] Resend 403 with resend.dev sender: verify subtextaudio.com in Resend and set CONTACT_FROM to an address on that domain.',
      );
    }

    throw new Error(`Resend API returned ${response.status}`);
  }

  let responseData = null;
  if (responseText) {
    try {
      responseData = JSON.parse(responseText);
    } catch {
      responseData = { raw: responseText };
    }
  }

  console.log('[contact] Resend success:', {
    status: response.status,
    id: responseData?.id || null,
  });
}
