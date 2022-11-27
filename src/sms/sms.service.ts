import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { SmsServiceInternalServerErrorException } from 'src/helpers/errors';

@Injectable()
export class SmsService {
  constructor(
    private httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async sendSmsMsg(phone: string, msg: string): Promise<object> {
    const res = await this.httpService
      .get(this.configService.get<string>('sendSmsServiceUrl'), {
        params: {
          api_id: this.configService.get<string>('smsApiId'),
          to: phone,
          msg,
          json: 1,
        },
      })
      .toPromise();

    if (res.data.status === 'ERROR') {
      throw new SmsServiceInternalServerErrorException(res.data.status_text);
    }

    return res;
  }

  async sendSms(phone: string, code: string): Promise<object> {
    const res = await this.httpService
      .get(this.configService.get<string>('sendSmsServiceUrl'), {
        params: {
          api_id: this.configService.get<string>('smsApiId'),
          to: phone,
          msg: `Ваш код для авторизации ${code}`,
          json: 1,
        },
      })
      .toPromise();

    if (res.data.status === 'ERROR') {
      throw new SmsServiceInternalServerErrorException(res.data.status_text);
    }

    return res;
  }
}
