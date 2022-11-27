import { BadRequestException } from '@nestjs/common';

export default class NoEmailBadRequestException extends BadRequestException {
  constructor() {
    super(`Сначала необходимо добавить электронную почту`);
  }
}
