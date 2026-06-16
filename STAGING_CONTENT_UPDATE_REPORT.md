# STAGING_CONTENT_UPDATE_REPORT.md

# Subtext Audio — Staging Content Update Report

Дата: 2026-06-06  
Сайт: `C:\!!!!!!!! SAIT\SubtextAudio_Website`  
Цель: подготовка MVP-сайта Subtext Audio к staging-публикации.

## 1. Итог

Сайт подготовлен к staging-публикации как статический preview.

Выполнено:

- Основной email заменён на `subtextaudio@gmail.com`.
- Старый `hello@subtextaudio.com` удалён из публичных HTML-страниц.
- Публичная WhatsApp-заглушка и номер `+000 000 000` удалены.
- Telegram оставлен как `@placeholder`, потому что точный username пока не предоставлен.
- About / Founder блоки обновлены на EN и RU.
- Contact pages EN/RU обновлены: формы явно обозначены как статические и не создают впечатления реальной отправки.
- Юридический адрес не добавлялся.
- Формулировок о существующей сербской компании не добавлялось.
- Публичный маркетинговый акцент на России не добавлялся; используются нейтральные формулировки про remote / international projects.

## 2. Изменённые файлы

| Файл | Что изменено |
|---|---|
| `index.html` | Обновлён Founder/About блок, CTA рядом с формой, email в футере, удалён WhatsApp из футера. |
| `ru/index.html` | Обновлён Founder/About блок на русском, CTA рядом с формой, email в футере, удалён WhatsApp из футера. |
| `about/index.html` | Добавлена реальная структура About: Founder, 15 лет радио, часовая информационная программа, рекламные аудиопрограммы, 10+ лет аудиомонтажа, текущая специализация. |
| `ru/about/index.html` | Добавлена русская версия About / Founder с теми же фактами. |
| `contact/index.html` | Обновлены контакты, удалён WhatsApp, добавлен `mailto:subtextaudio@gmail.com`, форма описана как static staging checklist. |
| `ru/contact/index.html` | Обновлены контакты, удалён WhatsApp, добавлен `mailto:subtextaudio@gmail.com`, форма описана как статический чек-лист. |
| `services/index.html` | Обновлён футер: email и нейтральная remote/international формулировка. |
| `ru/services/index.html` | Обновлён футер: email и нейтральная формулировка про удалённую работу. |
| `voice-demos/index.html` | Обновлён футер: email и нейтральная remote/international формулировка. |
| `ru/voice-demos/index.html` | Обновлён футер: email и нейтральная формулировка про удалённую работу. |
| `portfolio/index.html` | Обновлён футер: email и нейтральная remote/international формулировка. |
| `ru/portfolio/index.html` | Обновлён футер: email и нейтральная формулировка про удалённую работу. |

## 3. Contact EN/RU

### EN Contact

- Email: `subtextaudio@gmail.com`.
- Email link: `mailto:subtextaudio@gmail.com`.
- Telegram: `@placeholder`.
- WhatsApp: removed from public interface.
- Availability text: `remote audio production for international projects`.
- Form status: static staging checklist.
- Visible warning added: the form does not send requests yet and users should email the same details.
- Submit result message also says the request was not sent.

### RU Contact

- Email: `subtextaudio@gmail.com`.
- Email link: `mailto:subtextaudio@gmail.com`.
- Telegram: `@placeholder`.
- WhatsApp: removed from public interface.
- Format text: `работа с проектами удалённо`.
- Form status: статический чек-лист для staging.
- Видимое предупреждение добавлено: форма пока не отправляет заявку, данные нужно отправлять на email.
- Сообщение после нажатия также говорит, что заявка не была отправлена.

## 4. Founder / About обновление

Добавлены факты:

- Founder: Andrey Bizimov / Андрей Бизимов.
- 15 years of radio work / 15 лет работы на радио.
- Hosting an hour-long information program / ведение часовой информационной программы.
- Weekly advertising audio programs / создание еженедельных рекламных аудиопрограмм.
- More than 10 years of audio editing / более 10 лет аудиомонтажа.
- Current specialization: AI voiceover, audio production, YouTube narration, podcast production, localization, digital services.

Не добавлялось:

- Упоминание, что опыт ElevenLabs около 1 года.
- Юридический адрес.
- Утверждение, что сербская компания уже существует.

## 5. Оставшиеся placeholders

| Placeholder | Где | Статус |
|---|---|---|
| `Telegram: @placeholder` | Footer всех страниц, Contact EN/RU | Оставлен намеренно до получения точного username. |
| Portfolio / case placeholders | Home, Portfolio EN/RU | Можно оставить для staging, но нужно заменить перед production или явно оформить как demo cases. |
| Contact form backend | Contact EN/RU, `assets/js/main.js` | Backend отсутствует; теперь это явно написано рядом с формой. |
| Legal pages | Отдельных legal pages пока нет | Нужно добавить перед production, если сайт будет собирать заявки/аналитику. |
| Real client proof | Portfolio / cases / testimonials | Нужно подготовить для production-версии. |

## 6. Проверки

| Проверка | Результат |
|---|---|
| Старый email `hello@subtextaudio.com` | Не найден в HTML. |
| WhatsApp public placeholder | Не найден в HTML. |
| Телефон `+000 000 000` | Не найден в HTML. |
| Упоминание `Россия` / `Russia` как маркетинговый акцент | Не найдено. |
| Упоминание сербской компании как существующей | Не найдено. |
| Упоминание опыта ElevenLabs около 1 года | Не найдено. |
| Contact EN локально | 200 OK. |
| Contact RU локально | 200 OK. |
| Home EN/RU локально | 200 OK. |
| About EN/RU локально | 200 OK. |
| CSS / JS локально | 200 OK. |
| Внутренние `href/src` пути | Битых локальных путей не найдено. |

Примечание: в `services/index.html` есть фраза `English, Russian and future Serbian workflows`; это относится к языкам, а не к стране или маркетинговому позиционированию.

## 7. Готовность к staging

Сайт готов к staging-публикации.

Staging можно использовать для:

- просмотра дизайна;
- проверки EN/RU навигации;
- прослушивания финальных MP3 demo;
- проверки About / Founder позиционирования;
- согласования структуры услуг;
- сбора обратной связи по форме как визуальному и UX-элементу.

Важное ограничение: формы не отправляют заявки. Это теперь явно написано на Contact pages.

## 8. Что осталось до production

Перед production нужно:

1. Подключить обработку форм: PHP handler, SMTP, MCHost form mail или внешний form endpoint.
2. Заменить `Telegram: @placeholder` на реальный username или убрать Telegram полностью.
3. Подготовить legal pages: Privacy Policy, Terms, Cookies/Analytics notice при необходимости.
4. Добавить реальные portfolio/cases или оформить demo cases без риска путаницы с клиентскими проектами.
5. Подтвердить финальные контакты, часовой пояс и процесс обработки заявок.
6. Провести финальный mobile/browser QA после загрузки на staging-домен.
7. Проверить `robots.txt`, `sitemap.xml`, canonical/OG URL под фактический staging или production домен.

## 9. Рекомендация

Публиковать на staging можно сейчас. Для production сайт пока не готов из-за отсутствия backend-обработки форм, legal pages, реального Telegram и финальных portfolio/case материалов.
