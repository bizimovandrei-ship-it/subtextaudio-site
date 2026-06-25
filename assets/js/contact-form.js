const MIN_MESSAGE_LENGTH = 20;

const MESSAGES = {
  en: {
    success:
      'Thank you! Your request has been sent. I will contact you using the details you provided shortly.',
    generic:
      'We could not send your request. Please try again later or email subtextaudio@gmail.com directly.',
    messageShort:
      'Please describe your request in more detail. Your message must be at least 20 characters.',
    consentMissing: 'Please confirm your consent by checking the box above.',
    turnstile:
      'Security verification failed. Please refresh the page and try again.',
    sending: 'Sending…',
    unavailable:
      'The contact form is temporarily unavailable. Please email subtextaudio@gmail.com.',
  },
  ru: {
    success:
      'Спасибо! Ваша заявка успешно отправлена. Я свяжусь с вами по указанным контактным данным в ближайшее время.',
    generic:
      'Не удалось отправить заявку. Пожалуйста, попробуйте позже или напишите напрямую на subtextaudio@gmail.com.',
    messageShort:
      'Пожалуйста, опишите ваш запрос подробнее. Сообщение должно содержать не менее 20 символов.',
    consentMissing: 'Пожалуйста, подтвердите согласие, поставив галочку выше.',
    turnstile:
      'Не удалось пройти проверку безопасности. Пожалуйста, обновите страницу и попробуйте ещё раз.',
    sending: 'Отправка…',
    unavailable:
      'Форма временно недоступна. Напишите нам на subtextaudio@gmail.com.',
  },
};

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('form[data-contact-form]').forEach(initContactForm);
});

function initContactForm(form) {
  const lang = form.dataset.lang === 'ru' ? 'ru' : 'en';
  const messages = MESSAGES[lang];
  const config = window.SubtextContactConfig || {};
  const endpoint = config.endpoint || '/api/contact';
  const submitButton = form.querySelector('[type="submit"]');
  const statusMessage = form.querySelector('[data-form-message]');
  const turnstileContainer = form.querySelector('[data-turnstile]');
  const defaultButtonLabel = submitButton ? submitButton.textContent.trim() : '';

  let turnstileWidgetId = null;

  const renderTurnstile = () => {
    if (!turnstileContainer || !config.turnstileSiteKey || !window.turnstile) {
      return;
    }

    if (turnstileWidgetId !== null) {
      return;
    }

    turnstileWidgetId = window.turnstile.render(turnstileContainer, {
      sitekey: config.turnstileSiteKey,
      theme: 'light',
    });
  };

  const resetTurnstile = () => {
    if (window.turnstile && turnstileWidgetId !== null) {
      window.turnstile.reset(turnstileWidgetId);
    }
  };

  if (window.turnstile) {
    renderTurnstile();
  } else {
    window.addEventListener('load', renderTurnstile, { once: true });
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    clearStatus(statusMessage);

    const consentField = form.querySelector('[name="consent"]');
    if (!consentField || !consentField.checked) {
      showStatus(statusMessage, messages.consentMissing, 'error');
      return;
    }

    const messageField = form.querySelector('[name="message"]');
    const messageValue = messageField ? String(messageField.value || '').trim() : '';
    if (messageValue.length < MIN_MESSAGE_LENGTH) {
      showStatus(statusMessage, messages.messageShort, 'error');
      messageField?.focus();
      return;
    }

    const tokenField = form.querySelector('[name="cf-turnstile-response"]');
    const token = tokenField ? String(tokenField.value || '').trim() : '';

    if (!token) {
      showStatus(statusMessage, messages.turnstile, 'error');
      resetTurnstile();
      return;
    }

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = messages.sending;
    }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: new FormData(form),
        headers: {
          Accept: 'application/json',
        },
      });

      const contentType = response.headers.get('content-type') || '';
      let data = null;

      if (contentType.includes('application/json')) {
        data = await response.json();
      }

      if (response.ok && data && data.ok) {
        form.reset();
        resetTurnstile();
        showStatus(statusMessage, messages.success, 'success');
        return;
      }

      if (!data) {
        showStatus(statusMessage, messages.unavailable, 'error');
        resetTurnstile();
        return;
      }

      const errorText =
        typeof data.error === 'string' && data.error.trim() !== ''
          ? data.error
          : messages.generic;

      if (response.status === 400 && /безопасност|security/i.test(errorText)) {
        resetTurnstile();
      }

      showStatus(statusMessage, errorText, 'error');
    } catch {
      showStatus(statusMessage, messages.unavailable, 'error');
      resetTurnstile();
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = defaultButtonLabel;
      }
    }
  });
}

function clearStatus(element) {
  if (!element) {
    return;
  }

  element.hidden = true;
  element.textContent = '';
  element.classList.remove('is-success', 'is-error');
}

function showStatus(element, text, type) {
  if (!element) {
    return;
  }

  element.textContent = text;
  element.hidden = false;
  element.classList.remove('is-success', 'is-error');
  element.classList.add(type === 'success' ? 'is-success' : 'is-error');
  element.focus?.();
}
