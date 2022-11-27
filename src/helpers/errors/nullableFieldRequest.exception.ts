import { BadRequestException } from '@nestjs/common';

export default class NullableFieldBadRequestException extends BadRequestException {
  constructor() {
    super(`Найдено поле с нулевым значением`);
  }
}
