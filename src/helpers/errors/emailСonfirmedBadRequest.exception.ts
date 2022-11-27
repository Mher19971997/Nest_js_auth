import { BadRequestException } from '@nestjs/common';

export default class EmailСonfirmedBadRequestException extends BadRequestException {
  constructor(email: string) {
    super(`Электронная почта ${email} уже подтверждён`);
  }
}
