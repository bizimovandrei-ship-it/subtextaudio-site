# DEMO_INTEGRATION_PLAN

Дата: 2026-06-06
Сайт: `C:\!!!!!!!! SAIT\SubtextAudio_Website`
Источник финалистов: `C:\ElevenLabs_Library\WEBSITE_DEMO_FINALISTS.md`
Задача: карта замены аудио-заглушек на финальные MP3 без изменения сайта и без изменения MP3.

## 1. Краткий вывод

На текущем сайте все аудио-плееры используют одну заглушку:

`C:\!!!!!!!! SAIT\SubtextAudio_Website\assets\audio\placeholder-demo.wav`

Финальный набор должен состоять из 8 MP3 из `WEBSITE_DEMO_FINALISTS.md`. Все 8 исходных MP3 проверены: файлы существуют и не являются нулевыми.

Сайт менять на этом этапе не требуется. Этот документ задаёт карту будущей интеграции.

## 2. Где сейчас находятся аудио-заглушки

| Страница | Текущие карточки | Текущий файл |
|---|---|---|
| `index.html` | Corporate AI voiceover, YouTube narration, Localization sample | `assets/audio/placeholder-demo.wav` |
| `ru/index.html` | Corporate AI voiceover, YouTube narration, Localization sample | `assets/audio/placeholder-demo.wav` |
| `voice-demos/index.html` | EN Corporate Narration, EN YouTube Documentary, RU Educational Voice, Podcast Intro, Audio Cleanup, Localization | `assets/audio/placeholder-demo.wav` |
| `ru/voice-demos/index.html` | EN Corporate Narration, EN YouTube Documentary, RU Educational Voice, Podcast Intro, Audio Cleanup, Localization | `assets/audio/placeholder-demo.wav` |

Текущая структура раздела `Voice Demos` содержит 6 карточек. Для финального набора нужно расширить раздел до 8 карточек: добавить `IVR & Phone System` и `AI Voice Showcase`.

## 3. Карта замены по категориям

### 1. Documentary Narration

| Поле | Значение |
|---|---|
| Категория | Documentary Narration |
| Текущая заглушка | `assets/audio/placeholder-demo.wav`; ближайшая текущая карточка: `EN YouTube Documentary` |
| Финальный MP3 | `doc_02_northern_sea.mp3` |
| Исходный путь к файлу | `C:\ElevenLabs_Library\ElevenLabs_Voice_Library\01_Premium_Narrators\Bill_pqHfZKP75CvOlQylNhV4\samples_library_v3\doc_02_northern_sea.mp3` |
| Рекомендуемый путь на сайте | `assets/audio/documentary-narration-bill-northern-sea.mp3` |
| Название демо на сайте EN | Documentary Narration |
| Название демо на сайте RU | Документальная озвучка |
| Voice | Bill |
| Duration | 0:39 |
| Где показывать | Home + Voice Demos |

### 2. YouTube Voiceover

| Поле | Значение |
|---|---|
| Категория | YouTube Voiceover |
| Текущая заглушка | `assets/audio/placeholder-demo.wav`; текущая карточка: `YouTube narration` / `EN YouTube Documentary` |
| Финальный MP3 | `yt_01_intro_history.mp3` |
| Исходный путь к файлу | `C:\ElevenLabs_Library\ElevenLabs_Voice_Library\06_Social_Media\Liam_TX3LPaxmHKxFdv7VOQHJ\samples_library_v3\yt_01_intro_history.mp3` |
| Рекомендуемый путь на сайте | `assets/audio/youtube-voiceover-liam-history-intro.mp3` |
| Название демо на сайте EN | YouTube Voiceover |
| Название демо на сайте RU | Озвучка для YouTube |
| Voice | Liam |
| Duration | 0:30 |
| Где показывать | Home + Voice Demos |

### 3. Corporate Presentation

| Поле | Значение |
|---|---|
| Категория | Corporate Presentation |
| Текущая заглушка | `assets/audio/placeholder-demo.wav`; текущая карточка: `Corporate AI voiceover` / `EN Corporate Narration` |
| Финальный MP3 | `biz_01_strategy.mp3` |
| Исходный путь к файлу | `C:\ElevenLabs_Library\ElevenLabs_Voice_Library\02_Educational\Matilda_XrExE9yKIg1WjnnlVkGX\samples_library_v3\biz_01_strategy.mp3` |
| Рекомендуемый путь на сайте | `assets/audio/corporate-presentation-matilda-strategy.mp3` |
| Название демо на сайте EN | Corporate Presentation |
| Название демо на сайте RU | Корпоративная презентация |
| Voice | Matilda |
| Duration | 0:33 |
| Где показывать | Home + Voice Demos |

### 4. E-Learning Narration

| Поле | Значение |
|---|---|
| Категория | E-Learning Narration |
| Текущая заглушка | `assets/audio/placeholder-demo.wav`; текущая карточка: `RU Educational Voice` |
| Финальный MP3 | `edu_01_learning_plan.mp3` |
| Исходный путь к файлу | `C:\ElevenLabs_Library\ElevenLabs_Voice_Library\02_Educational\Matilda_XrExE9yKIg1WjnnlVkGX\samples_library_v3\edu_01_learning_plan.mp3` |
| Рекомендуемый путь на сайте | `assets/audio/e-learning-narration-matilda-learning-plan.mp3` |
| Название демо на сайте EN | E-Learning Narration |
| Название демо на сайте RU | Озвучка для обучения |
| Voice | Matilda |
| Duration | 0:34 |
| Где показывать | Voice Demos |

### 5. IVR & Phone System

| Поле | Значение |
|---|---|
| Категория | IVR & Phone System |
| Текущая заглушка | Нет отдельной текущей карточки; нужно добавить новую карточку в Voice Demos |
| Финальный MP3 | `biz_02_customer_demand.mp3` |
| Исходный путь к файлу | `C:\ElevenLabs_Library\ElevenLabs_Voice_Library\05_Conversational\Jessica_cgSgspJ2msm6clMCkdW9\samples_library_v3\biz_02_customer_demand.mp3` |
| Рекомендуемый путь на сайте | `assets/audio/ivr-phone-system-jessica-customer-demand.mp3` |
| Название демо на сайте EN | IVR & Phone System |
| Название демо на сайте RU | IVR и телефонные системы |
| Voice | Jessica |
| Duration | 0:29 |
| Где показывать | Voice Demos |

### 6. Podcast Intro

| Поле | Значение |
|---|---|
| Категория | Podcast Intro |
| Текущая заглушка | `assets/audio/placeholder-demo.wav`; текущая карточка: `Podcast Intro` |
| Финальный MP3 | `pod_01_decisions.mp3` |
| Исходный путь к файлу | `C:\ElevenLabs_Library\ElevenLabs_Voice_Library\01_Premium_Narrators\Jonathan_Livingston_PIGsltMj3gFMR34aFDI3\samples_library_v3\pod_01_decisions.mp3` |
| Рекомендуемый путь на сайте | `assets/audio/podcast-intro-jonathan-decisions.mp3` |
| Название демо на сайте EN | Podcast Intro |
| Название демо на сайте RU | Интро для подкаста |
| Voice | Jonathan Livingston |
| Duration | 0:26 |
| Где показывать | Voice Demos |

### 7. Audio Localization

| Поле | Значение |
|---|---|
| Категория | Audio Localization |
| Текущая заглушка | `assets/audio/placeholder-demo.wav`; текущая карточка: `Localization sample` / `Localization` |
| Финальный MP3 | `yt_03_travel_story.mp3` |
| Исходный путь к файлу | `C:\ElevenLabs_Library\ElevenLabs_Voice_Library\05_Conversational\Jessica_cgSgspJ2msm6clMCkdW9\samples_library_v3\yt_03_travel_story.mp3` |
| Рекомендуемый путь на сайте | `assets/audio/audio-localization-jessica-travel-story.mp3` |
| Название демо на сайте EN | Audio Localization |
| Название демо на сайте RU | Аудиолокализация |
| Voice | Jessica |
| Duration | 0:32 |
| Где показывать | Home + Voice Demos |

### 8. AI Voice Showcase

| Поле | Значение |
|---|---|
| Категория | AI Voice Showcase |
| Текущая заглушка | Нет отдельной текущей карточки; нужно добавить новую карточку в Voice Demos |
| Финальный MP3 | `yt_05_science_explainer.mp3` |
| Исходный путь к файлу | `C:\ElevenLabs_Library\ElevenLabs_Voice_Library\07_AI_Characters\Eva_weA4Q36twV5kwSaTEL0Q\samples_library_v3\yt_05_science_explainer.mp3` |
| Рекомендуемый путь на сайте | `assets/audio/ai-voice-showcase-eva-science-explainer.mp3` |
| Название демо на сайте EN | AI Voice Showcase |
| Название демо на сайте RU | Витрина AI-голоса |
| Voice | Eva |
| Duration | 0:37 |
| Где показывать | Voice Demos; можно заменить одно home demo, если нужно подчеркнуть AI |

## 4. Рекомендуемый порядок демо

### Voice Demos section: 8 карточек

Рекомендуемый порядок:

1. Documentary Narration
2. YouTube Voiceover
3. Corporate Presentation
4. E-Learning Narration
5. Audio Localization
6. Podcast Intro
7. IVR & Phone System
8. AI Voice Showcase

Логика порядка:

- сначала самые сильные и понятные публичные кейсы: documentary, YouTube, corporate;
- затем education и localization как коммерчески важные направления;
- затем podcast и IVR как более специализированные;
- AI showcase оставить финальным акцентом на диапазон синтетического голоса.

### Home page: 4 демо

Рекомендуемые 4 демо для главной:

1. Documentary Narration - Bill
2. YouTube Voiceover - Liam
3. Corporate Presentation - Matilda
4. Audio Localization - Jessica

Почему именно они:

- покрывают premium narration;
- показывают YouTube-направление;
- дают B2B/corporate доверие;
- показывают международность и localization.

Альтернатива, если нужно сильнее подчеркнуть AI:

- заменить `Corporate Presentation` или `Audio Localization` на `AI Voice Showcase - Eva`.

## 5. Проверка длины названий

| EN title | Длина | RU title | Длина | Итог |
|---|---:|---|---:|---|
| Documentary Narration | 21 | Документальная озвучка | 22 | OK |
| YouTube Voiceover | 17 | Озвучка для YouTube | 19 | OK |
| Corporate Presentation | 22 | Корпоративная презентация | 25 | OK |
| E-Learning Narration | 20 | Озвучка для обучения | 20 | OK |
| IVR & Phone System | 18 | IVR и телефонные системы | 24 | OK |
| Podcast Intro | 13 | Интро для подкаста | 18 | OK |
| Audio Localization | 18 | Аудиолокализация | 16 | OK |
| AI Voice Showcase | 17 | Витрина AI-голоса | 17 | OK |

Вывод: все названия подходят для текущих карточек. Самое длинное RU-название `Корпоративная презентация`, но оно укладывается в карточный формат.

## 6. Проверка структуры текущего Voice Demos

Текущая структура:

- page hero;
- intro text;
- grid из 6 карточек;
- каждая карточка содержит h3, описание, `<audio controls>`, meta tags.

Что нужно изменить на этапе интеграции:

1. Расширить grid с 6 до 8 карточек.
2. Заменить `placeholder-demo.wav` на индивидуальные MP3.
3. Заменить текущие demo names на финальные названия.
4. Добавить meta tags:
   - language;
   - voice;
   - use case;
   - duration.
5. Для RU-страницы сохранить те же MP3, но использовать RU-названия и RU-описания.

## 7. Проверка отображения карточек

Текущий CSS:

- `.grid-3` даёт 3 колонки на desktop;
- на `max-width:900px` карточки переходят в 1 колонку;
- audio player занимает `width: 100%`;
- meta tags переносятся через flex-wrap.

Вывод:

- 8 карточек будут отображаться как 3 + 3 + 2 на desktop;
- на mobile все 8 карточек будут идти одной колонкой;
- названия допустимой длины;
- для ровного desktop-ритма можно добавить 9-ю карточку позже, но для MVP 8 нормально.

## 8. Рекомендованная схема файлов на сайте

Перед изменением HTML MP3 следует скопировать в:

`C:\!!!!!!!! SAIT\SubtextAudio_Website\assets\audio\`

Рекомендуемые имена:

```text
assets/audio/documentary-narration-bill-northern-sea.mp3
assets/audio/youtube-voiceover-liam-history-intro.mp3
assets/audio/corporate-presentation-matilda-strategy.mp3
assets/audio/e-learning-narration-matilda-learning-plan.mp3
assets/audio/ivr-phone-system-jessica-customer-demand.mp3
assets/audio/podcast-intro-jonathan-decisions.mp3
assets/audio/audio-localization-jessica-travel-story.mp3
assets/audio/ai-voice-showcase-eva-science-explainer.mp3
```

Важно: этот документ не копирует и не изменяет MP3. Это только план будущей интеграции.

## 9. Что менять в HTML позже

После копирования MP3 нужно будет обновить:

| Файл | Что изменить |
|---|---|
| `index.html` | 3 текущих home audio cards заменить на 4 рекомендуемых demos |
| `ru/index.html` | то же, с RU-названиями и описаниями |
| `voice-demos/index.html` | заменить 6 карточек на финальные 8 |
| `ru/voice-demos/index.html` | заменить 6 карточек на финальные 8 с RU-текстами |

## 10. Итоговая рекомендация

Для главной показывать 4 демо:

1. Documentary Narration
2. YouTube Voiceover
3. Corporate Presentation
4. Audio Localization

В разделе Voice Demos оставить 8 демо:

1. Documentary Narration
2. YouTube Voiceover
3. Corporate Presentation
4. E-Learning Narration
5. Audio Localization
6. Podcast Intro
7. IVR & Phone System
8. AI Voice Showcase

Это даёт хороший баланс: премиальная narration, YouTube, B2B, обучение, локализация, подкасты, IVR и демонстрация AI-диапазона.

## 11. Статус

- MP3 не изменялись.
- Новое аудио не генерировалось.
- HTML/CSS/JS сайта не изменялись.
- Создан только план интеграции.
