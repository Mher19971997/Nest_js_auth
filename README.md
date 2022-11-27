<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

## Environment variables

### Put variables in .env file

| Name                           | Required      | Example Value                                | Description                                                     |
| ------------------------------ | ------------- | -------------------------------------------- | --------------------------------------------------------------- |
| PORT                           | partly        | 3000                                         | Nest.js app's port                                              |
| NODE_ENV                       | In production | production                                   | Nest.js app's env                                               |
| LANDING_ENDPOINT               | In production | https://wwww.labclick.ru                     | Landing endpoint                                                |
| TYPEORM_CONNECTION             | yes           | postgres                                     | TypeORM connection type                                         |
| TYPEORM_HOST                   | yes           | localhost                                    | PG host                                                         |
| TYPEORM_PORT                   | yes           | 5432                                         | PG port                                                         |
| TYPEORM_USERNAME               | yes           | labclick                                     | DB owner                                                        |
| TYPEORM_PASSWORD               | yes           | 123                                          | DB password                                                     |
| TYPEORM_DATABASE               | yes           | labclick_dev                                 | DB name                                                         |
| TYPEORM_SYNCHRONIZE            | yes           | false                                        | Auto Entities sync with db (!!! strictly `false` in production) |
| NEXT_PUBLIC_SENTRY_ENVIRONMENT | In production | dev                                          | Environment for sentry (used for error tracking)                |
| TYPEORM_ENTITIES               | yes           | dist/\*_/_.entity.js                         | Path to entities                                                |
| TYPEORM_MIGRATIONS             | yes           | dist/db/migrations/\*.js                     | Path to migration scripts                                       |
| TYPEORM_MIGRATIONS_DIR         | yes           | src/db/migrations                            | Path to migration scripts                                       |
| JWT_EXPIRATION_TIME            | yes           | 36000s                                       | JWT Token expiration time(in seconds)                           |
| JWT_SECRET                     | yes           | <secret key>                                 | JWT Token secret key                                            |
| JWT_SAME_SITE                  | yes           | none                                         | JWT same site option                                            |
| SALT_OR_ROUNDS                 | yes           | <some-salt>                                  | api salt                                                        |
| SMS_API_ID                     | yes           | <secret id>                                  | SMS API secret ID                                               |
| SEND_SMS_SERVICE_URL           | yes           | https://sms.ru/sms/send                      | Path send SMS service                                           |
| CORS_ORIGIN                    | yes           | http://localhost:3000 or \*                  | Where is the access to the API                                  |
| THROTTLE_TTL                   | yes           | 60                                           | Time blocked re-request                                         |
| THROTTLE_LIMIT                 | yes           | 1                                            | Number of requests followed by plating                          |
| SENTRY_DSN                     | In production | <value from sentry panel>                    | DSN URI for sentry                                              |
| YOU_MONEY_SHOP_ID              | yes           | <secret id>                                  | YOU MONEY payment systems secret ID                             |
| YOU_MONEY_SECRET_KEY           | yes           | <secret key>                                 | YOU MONEY payment systems secret Key                            |
| SENDGRID_API_KEY               | yes           | <secret key>                                 | SENDGRID email service secret Key                               |
| SENDGRID_EMAIL                 | yes           | labclick.dev@gmail.com                       | SENDGRID email address                                          |
| EMAIL_CONFIRMATION_URL         | yes           | http://localhost:3000/api/email/confirmEmail | Confirm Email Path                                              |
| EMAIL_CONFIRMATION_SUCCESS_URL | yes           | https://www.labclik.ru/?confirm=SUCCESS      | Confirm Email SUCCESS Path                                      |
| EMAIL_CONFIRMATION_FILE_URL    | yes           | https://www.labclik.ru/?confirm=FILE         | Confirm Email FILE Path                                         |
| SENTRY_ENVIRONMENT             | In production | dev                                          | Environment for sentry (used for error tracking)                |
| S3_REGION                      | yes           | ru-1                                         | S3 bucket region                                                |
| S3_ENDPOINT                    | yes           | https://s3.selcdn.ru                         | S3 endpoint                                                     |
| S3_BUCKET_PRIVATE              | yes           | <private bucket name>                        | S3 private bucket                                               |
| S3_BUCKET                      | yes           | <bucket name>                                | S3 bucket                                                       |
| S3_ACCESS_KEY_ID               | yes           | <bucket access key id>                       | S3 bucket                                                       |
| S3_SECRET_ACCESS_KEY           | yes           | <bucket secret access key>                   | S3 bucket                                                       |
