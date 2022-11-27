import { BadRequestException } from '@nestjs/common';

export default class CodeBadRequestException extends BadRequestException {
  constructor(code: number | string) {
    super(`${code} код не совпадает`);
  }
}
