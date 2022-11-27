import { BadRequestException } from '@nestjs/common';

export default class PassportBadRequestException extends BadRequestException {
  constructor(passport: string) {
    super(`Паспорт с  ${passport} идентификатором не существует`);
  }
}
