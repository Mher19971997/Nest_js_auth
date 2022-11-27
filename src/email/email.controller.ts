import { Controller, Get, Query, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(
    private readonly emailService: EmailService,
    private readonly configService: ConfigService,
  ) {}

  @Get('confirmEmail')
  async confirmEmail(@Query() query, @Res() res) {
    try {
      const { email, userId } = await this.emailService.decodeConfirmationToken(
        query.token,
      );
      await this.emailService.confirmEmail(email, userId);
      return res.redirect(
        this.configService.get('emailConfirmationSuccessUrl'),
      );
    } catch (error) {
      return res.redirect(
        this.configService.get('emailConfirmationFileUrl') +
          '&error=' +
          error.message,
      );
    }
  }
}
