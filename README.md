<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="50" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">

## Проба пера на Nest.js #1

Начало: стартовый репозиторий фреймворка [Nest](https://github.com/nestjs/nest) на Typescript.

## В приложении реализован следующий функционал

  - Конфигурация. .env.development, .env.production. Переменные окружения
  - Контроллеры, провайдеры (сервисы) [@Module, @Controller, @Injectable]()
  - Dependency Injection. Внедрение зависимостей
  - PostgreSQL. [Sequelize](https://sequelize.org/). Подключаемся к базе данных
  - UserModule. UserService. UserController
  - [Sequelize](https://sequelize.org/). Модель пользователя. [@Table, @Column]()
  - Работа с БД. [pgAdmin4](https://www.pgadmin.org)
  - Документация API. [Swagger](https://swagger.io/)
  - Роли пользователя. Связь между таблицами Many-to-many. [@BelongsToMany, @ForeignKey]()
  - AuthModule. Регистрация. Авторизация. [JWT](https://jwt.io/) Токен
  - Guards. CanActivate. Ограничиваем доступ неавторизованным пользователям
  - RolesGuard. Roles декоратор. Ограничение доступа пользователю без определенной роли
  - Выдача ролей. Бан пользователя
  - Pipes. Валидация входных данных. Class-validator. [@IsString, @IsEmail, @Length]()
  - GLobalPipes
  - Посты. Связь между таблицами One-to-many. [@HasMany]()
  - FileService. Работа с файлами. Раздача статики
  - [Docker](https://www.docker.com/). Dockerfile. Docker-compose.

## Тестирование

  - [Postman](https://www.postman.com/). Тестирование роутов

## Запуск приложения

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

# docker mode
$ docker-compose up

```
## License

Nest is [MIT licensed](LICENSE).
