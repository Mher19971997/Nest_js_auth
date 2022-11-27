import { InternalServerErrorException } from '@nestjs/common';

export default class SmsServiceInternalServerErrorException extends InternalServerErrorException {
  constructor(message: number | string) {
    super(`${message}`);
  }
}
