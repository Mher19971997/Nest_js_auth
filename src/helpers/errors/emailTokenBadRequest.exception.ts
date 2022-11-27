import { BadRequestException } from '@nestjs/common';

export default class EmailTokenBadRequestException extends BadRequestException {
  constructor() {
    super(`Неверный токен подтверждения`);
  }
}
