import { BadRequestException } from '@nestjs/common';

export default class PhoneBadRequestException extends BadRequestException {
  constructor(phone: number | string) {
    super(`Номер телефона ${phone} не найден`);
  }
}
