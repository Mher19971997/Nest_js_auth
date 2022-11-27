import { BadRequestException } from '@nestjs/common';

export default class AuthBadRequestException extends BadRequestException {
  constructor() {
    super(`Сначала необходимо пройти авторизацию для получение кода`);
  }
}
