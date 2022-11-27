import { BadRequestException } from '@nestjs/common';

export default class AddressBadRequestException extends BadRequestException {
  constructor(address: string) {
    super(`Адрес с ${address} идентификатором не существует`);
  }
}
