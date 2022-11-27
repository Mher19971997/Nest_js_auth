import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import {
  EmailTokenBadRequestException,
  EmailTokenExpiredBadRequestException,
  EmailСonfirmedBadRequestException,
} from 'src/helpers/errors';
import { UsersService } from 'src/users/users.service';
import ConfirmationTokenPayload from './dto/confirmationTokenPayload.interface';

const sgMail = require('@sendgrid/mail');
const UniSender = require('unisender');

@Injectable()
export class EmailService {
  constructor(
    private readonly configService: ConfigService,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly httpService: HttpService,
  ) {
    sgMail.setApiKey(configService.get<string>('sendGridApiKey'));
  }

  private readonly uniSender = new UniSender({
    api_key: this.configService.get('unisender.key'),
    lang: 'ru',
  });

  async sendEmail() {
    try {
      const res = await this.uniSender.createEmailMessage({
        sender_name: 'LabClick',
        sender_email: this.configService.get('unisender.email'),
        list_id: 1,
        template_id: this.configService.get(
          'unisender.confirmEmail.templateId',
        ),
      });

      return this.createCampaign(res.result.message_id);
    } catch (error) {
      console.error('error', error);
      if (error.response) {
        console.error('error.response.body', error.response.body);
        throw error.response.body;
      }
      throw error;
    }
  }

  public async createCampaign(message_id: string) {
    const res = await this.uniSender.createCampaign({
      message_id,
    });
    return res;
  }

  public async importContacts(email: string, email_list_ids: string | number) {
    const res = this.uniSender.importContacts({
      field_names: ['email', 'email_list_ids'],
      data: [{ email, email_list_ids }],
    });

    return res.result;
  }

  public async getLists() {
    const list = await this.uniSender.getLists();
    return list.result;
  }

  public async getTemplate(template_id: string) {
    console.log(template_id);

    const template = await this.httpService
      .get('https://api.unisender.com/ru/api/getTemplate', {
        params: {
          api_key: this.configService.get('unisender.key'),
          template_id,
          format: 'json',
        },
      })
      .toPromise();
    return template.data.result;
  }

  public async sendConfirmEmail(email: string, name: string, url: string) {
    const template = await this.getTemplate(
      this.configService.get('unisender.confirmEmail.templateId'),
    );
    let subject = template.subject;
    let body = template.body;

    body = body.replace('{{Name}}', name || '');
    body = body.replace('{{ConfirmUrl}}', url);

    try {
      const list = await this.uniSender.sendEmail({
        sender_name: 'LabClick',
        sender_email: this.configService.get('unisender.email'),
        email,
        body,
        subject,
        list_id: this.configService.get('unisender.confirmEmail.listId'),
      });
      console.log('list', email);

      return list.result;
    } catch (error) {
      console.log('errorerror', error);
    }
  }

  public async createList(title: string) {
    const list = await this.uniSender.createList({ title });
    return list.result;
  }

  public async sendConfirmationLink(email: string, userId: string) {
    const payload: ConfirmationTokenPayload = { email, userId };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('jwtSecret'),
      expiresIn: `${this.configService.get('jwtExpirationTime')}`,
    });

    const user = await this.usersService.getByEmail(email);
    const name = user.nameFirst;
    const url = `${this.configService.get(
      'emailConfirmationUrl',
    )}?token=${token}`;

    return this.sendConfirmEmail(email, name, url);
  }

  public async confirmEmail(email: string, userId: string) {
    const user = await this.usersService.getByUserIdAndEmail(email, userId);
    if (user.emailIsConfirmed) {
      throw new EmailСonfirmedBadRequestException(email);
    }
    await this.usersService.markEmailAsConfirm(email, userId);
  }

  public async decodeConfirmationToken(token: string) {
    try {
      const payload = await this.jwtService.verify(token, {
        secret: this.configService.get('jwtSecret'),
      });

      if (typeof payload === 'object' && 'email' in payload) {
        return payload;
      }
      throw new BadRequestException();
    } catch (error) {
      if (error?.name === 'TokenExpiredError') {
        throw new EmailTokenExpiredBadRequestException();
      }
      throw new EmailTokenBadRequestException();
    }
  }
}
