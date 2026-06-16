# SUBTEXT_AUDIO_BUILD_REPORT

Дата сборки: 2026-06-06
Проект: Subtext Audio MVP static website
Папка проекта: `C:\!!!!!!!! SAIT\SubtextAudio_Website`
Формат: чистый статический сайт HTML/CSS/JS без WordPress.

## 1. Что создано

Создана новая папка проекта:

`C:\!!!!!!!! SAIT\SubtextAudio_Website`

Созданные страницы:

| Страница | Файл |
|---|---|
| EN Home | `index.html` |
| RU Home | `ru/index.html` |
| EN Services | `services/index.html` |
| RU Services | `ru/services/index.html` |
| EN Voice Demos | `voice-demos/index.html` |
| RU Voice Demos | `ru/voice-demos/index.html` |
| EN Portfolio | `portfolio/index.html` |
| RU Portfolio | `ru/portfolio/index.html` |
| EN About | `about/index.html` |
| RU About | `ru/about/index.html` |
| EN Contact | `contact/index.html` |
| RU Contact | `ru/contact/index.html` |

Созданные assets:

| Файл | Назначение |
|---|---|
| `assets/css/style.css` | Общие стили, адаптивность, layout, cards, forms, audio blocks |
| `assets/js/main.js` | Mobile menu toggle и статический preview для форм |
| `assets/images/subtext-audio-mark.svg` | Временный SVG-знак / favicon Subtext Audio |
| `assets/audio/placeholder-demo.wav` | Валидная silent WAV-заглушка для HTML5 audio players |
| `robots.txt` | Базовый robots файл |
| `sitemap.xml` | Базовая sitemap для EN/RU MVP pages |

Создана структура каталогов:

```text
SubtextAudio_Website
├── index.html
├── robots.txt
├── sitemap.xml
├── about
├── assets
│   ├── audio
│   ├── css
│   ├── icons
│   ├── images
│   └── js
├── contact
├── portfolio
├── ru
│   ├── about
│   ├── contact
│   ├── portfolio
│   ├── services
│   └── voice-demos
├── services
└── voice-demos
```

## 2. Как открыть сайт локально

Вариант 1: открыть файл напрямую:

`C:\!!!!!!!! SAIT\SubtextAudio_Website\index.html`

Вариант 2: открыть через локальный HTTP-сервер:

```powershell
cd 'C:\!!!!!!!! SAIT\SubtextAudio_Website'
python -m http.server 8797 --bind 127.0.0.1
```

Затем открыть:

`http://127.0.0.1:8797/`

Проверенные локальные URL:

| URL | Статус |
|---|---:|
| `http://127.0.0.1:8797/` | 200 |
| `http://127.0.0.1:8797/ru/` | 200 |
| `http://127.0.0.1:8797/services/` | 200 |
| `http://127.0.0.1:8797/ru/services/` | 200 |
| `http://127.0.0.1:8797/voice-demos/` | 200 |
| `http://127.0.0.1:8797/contact/` | 200 |

## 3. Что уже работает

- EN homepage как основной вход.
- RU homepage как второй язык.
- Страницы Services, Voice Demos, Portfolio, About, Contact на EN/RU.
- Единая навигация по сайту.
- Переключатель языка EN/RU на всех страницах.
- Все локальные `href` и `src` проверены: битых локальных ссылок не найдено.
- Адаптивная структура CSS: desktop grid перестраивается в single-column layout на мобильных ширинах.
- Mobile menu toggle через `assets/js/main.js`.
- HTML5 audio players подключены к валидному placeholder WAV.
- Contact/brief формы сделаны как статический HTML preview без backend.
- SEO basics: `title`, `meta description`, `viewport`, `og:title`, `og:description`, `robots.txt`, `sitemap.xml`.
- Старый WordPress/gp-adept код не использовался.
- Подозрительные PHP, обфусцированный код и плагины не копировались.

## 4. Заглушки, которые нужно заменить

| Заглушка | Где находится | Что заменить |
|---|---|---|
| `hello@subtextaudio.com` | Footer, Contact pages | Реальный рабочий email |
| `@placeholder` | Footer, Contact pages | Реальный Telegram |
| `+000 000 000` | Footer, Contact pages | WhatsApp/телефон, если нужен |
| `placeholder-demo.wav` | Voice Demos, Home audio cards | 8-10 реальных аудио-демо |
| Временный SVG logo | `assets/images/subtext-audio-mark.svg` | Финальный логотип/brand mark |
| Portfolio cards | `portfolio/index.html`, `ru/portfolio/index.html` | Реальные кейсы или demo cases |
| About text | About pages | Реальная биография, опыт, инструменты, позиционирование |
| Form handling | Contact pages | Backend/email обработка, антиспам, consent storage |
| Legal copy | Сейчас нет отдельных legal pages | Добавить Privacy/Cookies/Terms перед публикацией |
| Open Graph image | Пока не задана отдельная картинка | Создать social preview image |

## 5. Что нужно сделать перед публикацией на MCHost

1. Подготовить реальные аудио-демо:
   - EN corporate narration;
   - EN YouTube narration;
   - RU educational voiceover;
   - RU YouTube/explainer;
   - podcast intro/outro;
   - audio cleanup before/after;
   - localization sample;
   - SR short sample, если готов.

2. Подключить реальные контакты:
   - email;
   - Telegram;
   - WhatsApp;
   - LinkedIn/YouTube при наличии.

3. Подключить backend для форм:
   - отправка на email;
   - антиспам;
   - сообщение об успешной отправке;
   - privacy consent.

4. Добавить legal pages:
   - Privacy Policy;
   - Cookies;
   - Terms / условия услуг;
   - AI voice usage disclaimer.

5. Заменить placeholder-контент:
   - кейсы;
   - portfolio cards;
   - about text;
   - service copy после редакторской вычитки.

6. Подготовить визуалы:
   - финальный логотип;
   - favicon;
   - hero visual;
   - demo covers;
   - case covers;
   - Open Graph image.

7. Финальная техническая проверка:
   - все ссылки после загрузки на хостинг;
   - формы;
   - мобильная версия;
   - скорость загрузки;
   - SSL/HTTPS;
   - redirects для `subtextaudio.com` и `www.subtextaudio.com`;
   - при необходимости привязка `subtextaudio.ru` как redirect или отдельная RU-точка.

8. SEO перед публикацией:
   - финальные title/meta descriptions;
   - canonical URLs;
   - hreflang EN/RU;
   - sitemap.xml с production URLs;
   - robots.txt;
   - Open Graph / social preview.

## 6. Проверки, выполненные после сборки

| Проверка | Результат |
|---|---|
| Наличие всех MVP HTML pages | OK |
| Наличие `assets/css`, `assets/js`, `assets/images`, `assets/audio`, `assets/icons` | OK |
| Проверка локальных `href`/`src` | OK, битых локальных ссылок не найдено |
| Проверка EN/RU переключателя | OK, ссылки ведут на парные страницы |
| Проверка локального HTTP открытия | OK, ключевые страницы вернули HTTP 200 |
| Проверка mobile CSS | OK, есть media queries для 900px и 560px |
| Проверка статических форм | OK, JS показывает preview-сообщение без backend |

## 7. Следующий шаг

Рекомендуемый следующий шаг: заменить placeholder-контент на реальные материалы для pre-production версии.

Приоритет:

1. Реальные контакты.
2. 8 аудио-демо.
3. 2-3 кейса.
4. Финальный логотип и favicon.
5. Legal pages.
6. Backend для формы.
7. Production SEO и загрузка на MCHost.

После этого можно делать Version 1.0: отдельные страницы Podcast Production, YouTube Narration, ElevenLabs Services, FAQ, Pricing и Blog.
