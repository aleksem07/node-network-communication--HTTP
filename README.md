# node-network-communication--HTTP

`npm init`

`"start"`: запускает в режиме dev
`"start:prod"`: запускает в режиме prod

`.env` - переменные среды

порт 3005 || 3000

1 установить npm inint
2.1 запустить сервер `npm start`
2.2 запустить postman
3 GET localhost:3005 - получить приветственное сообщение
4 GET localhost:3005/api/users- массив пользователей (несколько добавлены по умолчанию)
5 скопировать id юзера
6 GET localhost:3005/api/users/id (например localhost:3005/api/users/ba661737-dbf0-4354-b4cb-c4b90eaa0e7a) - получить юзера по id
7 POST localhost:3005/api/users - в body переключить на raw, json, добавить юзера (напр. `{
    "username": "df",
    "age": 23,
    "hobbies": ["soccer", "sky"],
}`) . Поля username, age, hobbies обязательны. Любые остальные - по желанию.
8 Повторить пункт 4, чтобы убедиться, что юзер добавлен
