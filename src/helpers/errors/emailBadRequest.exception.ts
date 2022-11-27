import { BadRequestException } from '@nestjs/common';

export default class EmailBadRequestException extends BadRequestException {
  constructor(email: string) {
    super(`Электронная почта ${email} недействительна`);
  }
}
