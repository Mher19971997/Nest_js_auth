import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

import * as bcrypt from 'bcrypt';
import { isMobileNumber } from 'src/helpers/validator';
import {
  filterObjectNulls,
  getCode,
  testIsHaveNulls,
  validateEmail,
} from 'src/helpers/utils';
import {
  AuthBadRequestException,
  CodeBadRequestException,
  PhoneBadRequestException,
  PassportBadRequestException,
  EmailBadRequestException,
  NoEmailBadRequestException,
  EmailСonfirmedBadRequestException,
  EmailExistBadRequestException,
} from 'src/helpers/errors';
import { ConfigService } from '@nestjs/config';
import { SmsService } from 'src/sms/sms.service';
import { EditProfileInput } from './dto/edit-user.input';
import { PassportService } from 'src/passport/passport.service';
import { EmailService } from 'src/email/email.service';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly configService: ConfigService,
    private readonly smsService: SmsService,
    @Inject(forwardRef(() => PassportService))
    private readonly passportService: PassportService,
    @Inject(forwardRef(() => EmailService))
    private readonly emailService: EmailService,
  ) {}

  public async findById(id: string): Promise<User> {
    return this.usersRepository.findOneOrFail({ id });
  }

  public async getByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ email });
  }

  public async getByUserIdAndEmail(
    email: string,
    userId: string,
  ): Promise<User> {
    return this.usersRepository.findOne({ email, id: userId });
  }

  public async getByValidEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ email, emailIsConfirmed: true });
  }

  public async findUsersByIds(ids: readonly string[]) {
    return this.usersRepository
      .createQueryBuilder('user')
      .where('user.id IN(:...ids)', { ids })
      .getMany();
  }

  public async auth(phone: string) {
    if (!isMobileNumber(phone)) {
      throw new PhoneBadRequestException(phone);
    }
    const user = await this.usersRepository.findOne({
      where: [
        {
          phone,
        },
      ],
    });

    if (!user) {
      const newUser = this.usersRepository.create();
      newUser.phone = phone;
      await this.usersRepository.save(newUser);
    }
    await this.generateAndSendSms(phone);
    return true;
  }

  private async generateSmsCodeForUser(userId: string, code: string) {
    const hash = await bcrypt.hash(
      code,
      +this.configService.get<string>('saltOrRounds'),
    );
    await this.usersRepository.update(userId, { phoneCode: hash });
  }

  public async generateAndSendSms(phone: string): Promise<void> {
    const user = await this.usersRepository.findOne({ phone });
    if (!user) {
      throw new PhoneBadRequestException(phone);
    }
    const code = getCode();
    // TODO add in prode
    await this.smsService.sendSms(phone, code);
    await this.generateSmsCodeForUser(user.id, code);
  }

  public async verify(phone: string, code: string): Promise<User> {
    if (!isMobileNumber(phone)) {
      throw new PhoneBadRequestException(phone);
    }

    const user = await this.usersRepository.findOne({
      where: [
        {
          phone,
        },
      ],
    });

    if (!user) {
      throw new PhoneBadRequestException(phone);
    }

    if (!user.phoneCode) {
      throw new AuthBadRequestException();
    }
    const isMatch = await bcrypt.compare(code, user.phoneCode);

    if (!isMatch && !this.configService.get<boolean>('isDev')) {
      throw new CodeBadRequestException(code);
    }

    await this.usersRepository.update(
      { phone },
      {
        phoneCode: null,
        phoneIsVerified: true,
      },
    );

    return user;
  }

  public async updatePassport(userId: string, passportId: string) {
    const passport = this.passportService.findById(passportId);
    if (!passport) {
      throw new PassportBadRequestException(passportId);
    }
    await this.usersRepository.update(
      { id: userId },
      {
        passportId,
      },
    );
    return this.findById(userId);
  }

  public async editProfile(userId: string, input: EditProfileInput) {
    const body = filterObjectNulls(input);
    testIsHaveNulls(body, input);
    const user = await this.findById(userId);
    let dataReq: any = { ...input };

    if (input.email && input.email !== user.email) {
      if (await this.getByValidEmail(input.email)) {
        throw new EmailExistBadRequestException(input.email);
      }
      dataReq = { ...dataReq, emailIsConfirmed: false };
    }

    await this.usersRepository.update(
      { id: userId },
      {
        ...input,
      },
    );
    dataReq.email && this.sendEmailConfirmToken(userId);
    return this.findById(userId);
  }

  public async editEmail(userId: string, email: string) {
    if (!validateEmail(email)) {
      throw new EmailBadRequestException(email);
    }

    if (await this.getByValidEmail(email)) {
      throw new EmailExistBadRequestException(email);
    }

    await this.usersRepository.update(
      { id: userId },
      {
        email,
        emailIsConfirmed: false,
      },
    );
    this.sendEmailConfirmToken(userId);
    return this.findById(userId);
  }

  public async sendEmailConfirmToken(userId: string) {
    const { email, emailIsConfirmed } = await this.findById(userId);
    if (!email) {
      throw new NoEmailBadRequestException();
    }

    if (emailIsConfirmed) {
      throw new EmailСonfirmedBadRequestException(email);
    }

    if (await this.getByValidEmail(email)) {
      throw new EmailExistBadRequestException(email);
    }

    await this.emailService.sendConfirmationLink(email, userId);
    return true;
  }

  public async resendConfirmationLink(userId: string) {
    const { email, emailIsConfirmed } = await this.findById(userId);

    if (!email) {
      throw new NoEmailBadRequestException();
    }

    if (emailIsConfirmed) {
      throw new EmailСonfirmedBadRequestException(email);
    }
    await this.sendEmailConfirmToken(email);
    return true;
  }

  async markEmailAsConfirm(email: string, userId: string) {
    return this.usersRepository.update(
      { email, id: userId },
      {
        emailIsConfirmed: true,
      },
    );
  }
}
