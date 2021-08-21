# movies-explorer-api

Cссылка на API: [api.diplom-web.vadikm.ru](https://api.diplom-web.vadikm.ru)

##Запросы

| Запрос | Описание |
| ------ | ------ |
| GET /users/me | возвращает информацию о пользователе (email и имя) |
| PATCH /users/me | обновляет информацию о пользователе (email и имя) |
| GET /movies |все сохранённые пользователем фильмы |
| POST /movies |создаёт фильм с переданными в теле данными |
| DELETE /movies/movieId | удаляет сохранённый фильм по movieId |
| POST /signup |создаёт пользователя с переданными в теле данными |
| POST /signin |сохраняет JWT в куках, если в теле запроса переданы правильные почта и пароль |
| POST /signin |удаляет JWT из куки |

Преременные окружения прописываются в .env
Для примера есть .env.example
