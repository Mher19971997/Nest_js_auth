import { BadRequestException } from '@nestjs/common';

export default class EmailExistBadRequestException extends BadRequestException {
  constructor(email: string) {
    super(`Пользователь с электронной почтой ${email} уже зарегистрирован`);
  }
}
