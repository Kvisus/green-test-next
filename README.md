This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Запуск

```shell
npm i && npm run dev
```

Перейти на `http://localhost:3000`

## Превью

- Пользователь вводит данные Green-API
- Открыватся поле с номером абонента
- При вводе корректного номера (11 цифр), открыватся окно чата. При смене номера абонента, чат очищается.
- Получение сообщений реализованно двумя способами, дабы не тратить использование обращений к API:
  1. При открытом окне чата идёт проверка каждые 10 секунд на наличие новых уведомлений
  2. Кнопка Receive, дабы проверить сейчас.

Статус инстанса не проверяется.
Номер собеседника ожидается без знаков и пробелов, только цифры.
Логи в консоли оставлены для отлова ошибок.
Пока не проводится проверка соответствия номера активного контакта с номером в принятом уведомлении, не делал исходя из прочтения тз. Имплиментация не вызывает воспросов.

## Дальнейшие улучшения

- Добавить Debounce на кнопку получения сообщения
- Доработка дизайна, добавить оригинальные цвет и картинку на бэк.
- Использовать sdk.
