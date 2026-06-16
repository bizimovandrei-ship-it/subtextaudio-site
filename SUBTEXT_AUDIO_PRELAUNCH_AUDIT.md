# SUBTEXT_AUDIO_PRELAUNCH_AUDIT

Дата аудита: 2026-06-06
Сайт: Subtext Audio MVP
Путь: `C:\!!!!!!!! SAIT\SubtextAudio_Website`
Домены: `subtextaudio.com`, `subtextaudio.ru`
Формат: статический HTML/CSS/JS сайт без WordPress.

## 1. Краткий вывод

MVP технически собран чисто и может использоваться как локальная pre-production версия. Все EN/RU страницы существуют, локально открываются, внутренние ссылки и пути к assets проверены, PHP/GoodwinPress/gp-adept следов не найдено.

Однако публиковать на MCHost как публичный рабочий сайт пока рано: на сайте остаются контактные placeholders, audio placeholders, временные portfolio/case карточки, нет backend-обработки форм, нет legal pages и нет `og:image` для social preview.

Готовность к загрузке на MCHost как preview/staging: **да**.
Готовность к публичному production-запуску: **частично, после исправления критичных пунктов**.

## 2. Проверенные страницы

| Страница | Файл | Локальный HTTP статус | Итог |
|---|---|---:|---|
| EN Home | `index.html` | 200 | OK |
| RU Home | `ru/index.html` | 200 | OK |
| EN Services | `services/index.html` | 200 | OK |
| RU Services | `ru/services/index.html` | 200 | OK |
| EN Voice Demos | `voice-demos/index.html` | 200 | OK |
| RU Voice Demos | `ru/voice-demos/index.html` | 200 | OK |
| EN Portfolio | `portfolio/index.html` | 200 | OK |
| RU Portfolio | `ru/portfolio/index.html` | 200 | OK |
| EN About | `about/index.html` | 200 | OK |
| RU About | `ru/about/index.html` | 200 | OK |
| EN Contact | `contact/index.html` | 200 | OK |
| RU Contact | `ru/contact/index.html` | 200 | OK |
| robots.txt | `robots.txt` | 200 | OK |
| sitemap.xml | `sitemap.xml` | 200 | OK |

## 3. Внутренние ссылки и assets

Автоматическая проверка всех локальных `href` и `src` прошла успешно.

Результат: **битых локальных ссылок не найдено**.

Проверены пути к:

- `assets/css/style.css`;
- `assets/js/main.js`;
- `assets/images/subtext-audio-mark.svg`;
- `assets/audio/placeholder-demo.wav`;
- EN/RU страницам;
- language switch EN/RU;
- navigation links;
- contact form anchors.

## 4. Language switch EN/RU

| Страница | Переключение | Итог |
|---|---|---|
| `/index.html` -> `/ru/index.html` | Работает | OK |
| `/ru/index.html` -> `/index.html` | Работает | OK |
| `/services/` <-> `/ru/services/` | Работает | OK |
| `/voice-demos/` <-> `/ru/voice-demos/` | Работает | OK |
| `/portfolio/` <-> `/ru/portfolio/` | Работает | OK |
| `/about/` <-> `/ru/about/` | Работает | OK |
| `/contact/` <-> `/ru/contact/` | Работает | OK |

Замечание: `hreflang` tags в HTML пока отсутствуют. Для production SEO их желательно добавить.

## 5. robots.txt и sitemap.xml

### robots.txt

Текущее содержимое:

```text
User-agent: *
Allow: /

Sitemap: https://subtextaudio.com/sitemap.xml
```

Итог: **OK для production**, если sitemap остаётся на `subtextaudio.com`.

### sitemap.xml

Sitemap содержит 12 URL:

- EN/RU Home;
- EN/RU Services;
- EN/RU Voice Demos;
- EN/RU Portfolio;
- EN/RU About;
- EN/RU Contact.

Итог: **OK для текущей MVP-структуры**.

Что улучшить перед production:

- добавить `lastmod` после финальной загрузки;
- добавить legal pages, если они будут созданы;
- если `subtextaudio.ru` будет отдельной точкой, решить схему canonical/redirect.

## 6. SEO title / description / H1

Все 12 HTML-страниц имеют:

- `<html lang="en/ru">`;
- `<title>`;
- `<meta name="description">`;
- ровно один `<h1>`;
- базовые Open Graph title/description.

Проблемы:

- нет canonical URLs;
- нет `hreflang`;
- нет `og:image`;
- descriptions пока черновые и местами содержат `Temporary`, `Placeholder`, `HTML5 audio demo placeholders`, что нельзя оставлять для публичной индексации.

Итог: **SEO-база есть, production SEO требует доработки**.

## 7. Open Graph / social preview

Найдено:

- `og:title`;
- `og:description`;
- `og:type`;
- `og:site_name`.

Не найдено:

- `og:image`;
- `og:url`;
- Twitter/X card tags.

Критичность: **некритично для технического запуска, важно до публичного продвижения**.

Что добавить:

- `assets/images/social-preview-en.jpg`;
- `assets/images/social-preview-ru.jpg`;
- `og:image` на всех страницах;
- `og:url`;
- `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`.

## 8. Mobile responsive layout

В `assets/css/style.css` есть media queries:

- `@media(max-width:900px)`;
- `@media(max-width:560px)`.

Что адаптируется:

- grid layouts переходят в одну колонку;
- hero layout переходит в одну колонку;
- navigation collapses into mobile menu;
- buttons stretch on narrow screens;
- footer becomes one-column;
- audio cards and forms become one-column.

Итог: **базовая мобильная адаптация есть**.

Перед production желательно визуально проверить в браузере:

- 360px ширина;
- 390px iPhone width;
- 768px tablet;
- desktop 1366px+.

## 9. Формы Contact / Brief

Формы есть на:

- `contact/index.html`;
- `ru/contact/index.html`.

Поля EN:

- Name;
- Email;
- Service;
- Message;
- consent checkbox.

Поля RU:

- Имя;
- Email;
- Услуга;
- Сообщение;
- consent checkbox.

Поведение:

- формы не отправляют данные на сервер;
- `assets/js/main.js` перехватывает submit;
- показывается уведомление:
  - EN: `Static preview: backend handling is not connected yet.`
  - RU: `Статический preview: backend-обработка пока не подключена.`

Итог: **OK для preview, не готово для production lead capture**.

### Рекомендуемая обработка заявок на MCHost

Вариант A, самый простой:

- использовать PHP mail handler на хостинге;
- отправлять заявку на рабочий email;
- добавить honeypot field;
- добавить server-side validation;
- добавить простую anti-spam задержку/rate limit;
- после отправки показывать success page или inline success state.

Вариант B, надёжнее:

- использовать Formspree / Basin / Getform / Tally / Google Forms backend;
- меньше server-side кода;
- быстрее подключить;
- проверить соответствие privacy/GDPR.

Вариант C, для будущего:

- отправка в CRM/таблицу;
- email notification;
- auto-reply клиенту;
- upload через отдельный file request link.

Для MCHost рационально начать с **простого PHP handler + honeypot + email notification**, если тариф поддерживает PHP.

## 10. Аудио-плееры

HTML5 audio players найдены на:

- `index.html`;
- `ru/index.html`;
- `voice-demos/index.html`;
- `ru/voice-demos/index.html`.

Все плееры используют один файл:

`assets/audio/placeholder-demo.wav`

Файл существует и является валидной WAV-заглушкой.

Итог: **технически плееры подключены, production audio отсутствует**.

### Что заменить

Нужно заменить `placeholder-demo.wav` на реальные файлы, лучше отдельными именами:

| Будущий файл | Назначение |
|---|---|
| `assets/audio/en-corporate-ai-voiceover.mp3` | EN corporate/B2B demo |
| `assets/audio/en-youtube-documentary.mp3` | EN YouTube narration demo |
| `assets/audio/ru-educational-voiceover.mp3` | RU educational voice demo |
| `assets/audio/ru-youtube-explainer.mp3` | RU YouTube/explainer demo |
| `assets/audio/podcast-intro-outro.mp3` | Podcast production sample |
| `assets/audio/audio-cleanup-before.mp3` | Before cleanup sample |
| `assets/audio/audio-cleanup-after.mp3` | After cleanup sample |
| `assets/audio/localization-ru-en-source.mp3` | Localization source sample |
| `assets/audio/localization-ru-en-target.mp3` | Localization target sample |
| `assets/audio/sr-short-localization-sample.mp3` | Serbian sample, если готов |

Рекомендация: использовать MP3 для совместимости и WebM/OGG как optional fallback.

## 11. Проверка на старые следы и подозрительные файлы

Проверено по проекту:

- `GoodwinPress`;
- `gp-adept`;
- `eval(`;
- `base64_decode`;
- `gzinflate`;
- `php`;
- `google-analytics`;
- `googletagmanager`;
- `yandex` / `metrika`;
- `facebook` / `pixel`.

Результат:

- старых GoodwinPress/gp-adept следов не найдено;
- подозрительного PHP не найдено;
- PHP-файлов нет;
- внешних трекеров нет;
- аналитика не подключена;
- сторонних JS-библиотек нет;
- только один локальный JS-файл `assets/js/main.js`.

## 12. Лишние файлы

Состав файлов:

- 12 HTML;
- 1 CSS;
- 1 JS;
- 1 SVG;
- 1 WAV placeholder;
- `robots.txt`;
- `sitemap.xml`;
- `SUBTEXT_AUDIO_BUILD_REPORT.md`.

Потенциально лишний для production:

- `SUBTEXT_AUDIO_BUILD_REPORT.md` — лучше не загружать в публичный web root.

Пустые директории:

- `assets/icons` сейчас пустая, но допустима как подготовленная структура.

## 13. Критичные проблемы

| Проблема | Почему критично | Что сделать |
|---|---|---|
| Формы без backend | Сайт не сможет принимать заявки | Подключить PHP/form backend или внешний form service |
| Контактные placeholders | Клиент увидит `@placeholder`, `+000 000 000` | Заменить на реальные контакты |
| Audio placeholders | Плееры работают, но демо не демонстрируют качество | Заменить на реальные аудио-демо |
| Нет legal pages | Формы собирают персональные данные | Добавить Privacy Policy / Cookies / Terms или убрать сбор до готовности |
| Черновой placeholder content | Portfolio/About/Demos выглядят как незавершённый сайт | Заменить перед публичным запуском |

## 14. Некритичные проблемы

| Проблема | Влияние | Когда исправить |
|---|---|---|
| Нет `og:image` | Плохой social preview | До продвижения / до публикации желательно |
| Нет canonical | SEO-сигналы слабее | До индексации |
| Нет hreflang | RU/EN SEO слабее | До индексации |
| Нет Twitter/X card tags | Social preview неполный | После/до публикации |
| Нет отдельной `/brief/` страницы | Brief встроен в Contact | Можно после запуска |
| Нет privacy/cookies в sitemap | Страниц ещё нет | После создания legal pages |
| Пустая `assets/icons` | Не мешает | Можно оставить |

## 15. Что можно публиковать как есть

Можно публиковать как staging/preview на закрытой или неиндексируемой ссылке:

- структура сайта;
- дизайн-система MVP;
- EN/RU страницы;
- навигация;
- language switch;
- аудио-плеер блоки;
- portfolio placeholders;
- contact form preview;
- robots/sitemap как технический черновик.

Не рекомендуется публиковать как полноценный публичный сайт без исправления критичных проблем.

## 16. Что обязательно исправить до публикации

1. Заменить контактные placeholders:
   - `@placeholder`;
   - `+000 000 000`;
   - timezone;
   - при необходимости добавить LinkedIn/YouTube.

2. Подключить обработку формы:
   - email delivery;
   - validation;
   - anti-spam;
   - success/error states.

3. Добавить legal pages:
   - Privacy Policy;
   - Cookies;
   - Terms или service terms;
   - AI voice usage disclaimer.

4. Заменить аудио-заглушки на реальные demo files.

5. Заменить временные portfolio/case карточки.

6. Добавить production social preview:
   - `og:image`;
   - `og:url`;
   - Twitter card tags.

7. Удалить из публичной загрузки:
   - `SUBTEXT_AUDIO_BUILD_REPORT.md`.

## 17. Что можно исправить после публикации

- расширить Voice Demos до 10-20 файлов;
- добавить отдельную страницу Brief;
- добавить Podcast Production, YouTube Narration, ElevenLabs Services;
- добавить Pricing/Packages;
- добавить FAQ page;
- добавить Blog;
- добавить SR language version;
- добавить advanced SEO structured data;
- добавить CRM integration;
- добавить newsletter/lead magnet.

## 18. Точный список файлов/заглушек для замены

### Контентные HTML-файлы

| Файл | Что заменить |
|---|---|
| `index.html` | аудио cards, temporary case cards, about text, final CTA если нужно |
| `ru/index.html` | аудио cards, temporary case cards, about text, final CTA если нужно |
| `voice-demos/index.html` | все demo titles/descriptions/audio src |
| `ru/voice-demos/index.html` | все demo titles/descriptions/audio src |
| `portfolio/index.html` | 3 placeholder case cards |
| `ru/portfolio/index.html` | 3 placeholder case cards |
| `about/index.html` | founder bio, experience, tools, studio model |
| `ru/about/index.html` | биография, опыт, инструменты, модель студии |
| `contact/index.html` | contacts, form action/backend, consent text |
| `ru/contact/index.html` | контакты, backend формы, consent text |

### Assets

| Файл | Что заменить |
|---|---|
| `assets/audio/placeholder-demo.wav` | заменить на реальные MP3/WAV демо, затем обновить `src` в HTML |
| `assets/images/subtext-audio-mark.svg` | заменить на финальный логотип/favicon или оставить как временный знак |
| `assets/css/style.css` | после финального дизайна можно расширить, сейчас технически OK |
| `assets/js/main.js` | добавить production form handling только если не используется backend action |

### Файлы, которые не загружать в public web root

| Файл | Причина |
|---|---|
| `SUBTEXT_AUDIO_BUILD_REPORT.md` | внутренний отчёт, не нужен посетителям |
| будущий `SUBTEXT_AUDIO_PRELAUNCH_AUDIT.md` | внутренний аудит, не нужен посетителям |

## 19. Готовность к MCHost

### Можно загрузить сейчас для preview

Да, если это staging/preview и понятно, что формы и аудио являются заглушками.

### Для production на MCHost нужно

- загрузить содержимое сайта в web root домена `subtextaudio.com`;
- настроить SSL;
- настроить redirect `www` -> non-www или наоборот;
- решить роль `subtextaudio.ru`: redirect на `/ru/` или отдельная копия RU сайта;
- подключить форму;
- добавить legal pages;
- заменить заглушки;
- убрать `.md` отчёты из public;
- обновить sitemap после финальных URL;
- проверить сайт через браузер и mobile.

## 20. Итоговая оценка

| Категория | Оценка |
|---|---:|
| Структура страниц | 9/10 |
| Внутренние ссылки | 10/10 |
| EN/RU переключение | 9/10 |
| Assets paths | 10/10 |
| SEO base | 6/10 |
| Social preview | 4/10 |
| Mobile base | 8/10 |
| Формы | 4/10 |
| Audio demos | 3/10 |
| Security cleanliness | 10/10 |
| MCHost readiness as preview | 8/10 |
| MCHost readiness as production | 5/10 |

Финальный вердикт: сайт технически чистый и готов для staging/preview загрузки. Для публичного запуска обязательно заменить контакты, аудио, кейсы, подключить backend формы и добавить legal/SEO/social-preview элементы.
