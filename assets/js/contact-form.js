const MESSAGES = {
  en: {
    success:
      'Thank you! Your message has been sent successfully. We will contact you after reviewing your request.',
    generic: 'Unable to send your message. Please try again later.',
    turnstile: 'Please complete the security check before sending.',
    sending: 'Sending…',
    unavailable:
      'The contact form is temporarily unavailable. Please email subtextaudio@gmail.com.',
  },
  ru: {
    success:
      'Спасибо! Ваше сообщение успешно отправлено. Мы свяжемся с вами после рассмотрения заявки.',
    generic: 'Не удалось отправить сообщение. Пожалуйста, попробуйте позже.',
    turnstile: 'Пожалуйста, пройдите проверку безопасности перед отправкой.',
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
  const defaultButtonLabel = submitButton ? submitButton.textContent : '';

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

  if (window.turnstile) {
    renderTurnstile();
  } else {
    window.addEventListener('load', renderTurnstile, { once: true });
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    clearStatus(statusMessage);

    const tokenField = form.querySelector('[name="cf-turnstile-response"]');
    const token = tokenField ? tokenField.value : '';

    if (!token) {
      showStatus(statusMessage, messages.turnstile, 'error');
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
        if (window.turnstile && turnstileWidgetId !== null) {
          window.turnstile.reset(turnstileWidgetId);
        }
        showStatus(statusMessage, messages.success, 'success');
        return;
      }

      if (!data) {
        showStatus(statusMessage, messages.unavailable, 'error');
        return;
      }

      const errorText =
        typeof data.error === 'string' && data.error.trim() !== ''
          ? data.error
          : messages.generic;
      showStatus(statusMessage, errorText, 'error');
    } catch {
      showStatus(statusMessage, messages.unavailable, 'error');
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
