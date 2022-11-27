import { ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { EmailService } from './email.service';
import { ConfirmEmailInput } from './dto/confirm-email.input';

@Resolver('email')
@UseInterceptors(ClassSerializerInterceptor)
export class EmailResolver {
  constructor(private readonly emailService: EmailService) {}

  @Mutation(() => Boolean)
  public async confirmEmail(
    @Args('confirmationData', { type: () => ConfirmEmailInput })
    confirmationData: ConfirmEmailInput,
  ) {
    const { email, userId } = await this.emailService.decodeConfirmationToken(
      confirmationData.token,
    );
    await this.emailService.confirmEmail(email, userId);
    return true;
  }
}
