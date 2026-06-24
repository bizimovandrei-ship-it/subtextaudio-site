const GENERIC_ERROR = 'Unable to send your message. Please try again later.';

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

  try {
    const formData = await request.formData();

    if (String(formData.get('website') || '').trim() !== '') {
      return jsonError(GENERIC_ERROR, 400);
    }

    const clientIp = getClientIp(request);
    if (!(await checkRateLimit(env, clientIp))) {
      return jsonError(GENERIC_ERROR, 429);
    }

    const turnstileToken = String(formData.get('cf-turnstile-response') || '').trim();
    if (
      !turnstileToken ||
      !(await verifyTurnstile(turnstileToken, clientIp, env.TURNSTILE_SECRET_KEY))
    ) {
      return jsonError(GENERIC_ERROR, 400);
    }

    const name = sanitizeText(formData.get('name'), 100);
    const email = String(formData.get('email') || '').trim();
    const service = sanitizeText(formData.get('service'), 120);
    const message = sanitizeText(formData.get('message'), 5000);
    const consent = formData.get('consent');

    if (name.length < 2) {
      return jsonError(GENERIC_ERROR, 400);
    }

    if (!isValidEmail(email)) {
      return jsonError(GENERIC_ERROR, 400);
    }

    if (!service || !ALLOWED_SERVICES.has(service)) {
      return jsonError(GENERIC_ERROR, 400);
    }

    if (message.replace(/\s+/g, '').length < 10) {
      return jsonError(GENERIC_ERROR, 400);
    }

    if (!consent) {
      return jsonError(GENERIC_ERROR, 400);
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
    console.error('Contact form error:', error instanceof Error ? error.message : error);
    return jsonError(GENERIC_ERROR, 500);
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
    console.error('TURNSTILE_SECRET_KEY is not configured.');
    return false;
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

  if (!response.ok) {
    return false;
  }

  const data = await response.json();
  return data.success === true;
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

async function sendContactEmail(env, payload) {
  const apiKey = env.RESEND_API_KEY;
  const from = env.CONTACT_FROM;
  const to = env.CONTACT_TO || 'subtextaudio@gmail.com';

  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not configured.');
  }

  if (!from) {
    throw new Error('CONTACT_FROM is not configured.');
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: payload.email,
      subject: `Subtext Audio — project brief from ${payload.name}`,
      text: buildEmailBody(payload),
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    console.error('Resend API error:', response.status, detail);
    throw new Error(`Resend API returned ${response.status}`);
  }
}
