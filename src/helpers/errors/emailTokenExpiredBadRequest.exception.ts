import { BadRequestException } from '@nestjs/common';

export default class EmailTokenExpiredBadRequestException extends BadRequestException {
  constructor() {
    super(`Срок действия токена подтверждения электронной почты истек`);
  }
}
