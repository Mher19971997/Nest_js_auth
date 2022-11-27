import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/jwt-aut.guard';
import { CurrentUser } from 'src/users/current-user.guard';
import { User } from 'src/users/users.entity';
import { PassportInput } from './dto/passport.input';
import { Passport } from './passport.entity';
import { PassportService } from './passport.service';

@Resolver(() => Passport)
export class PassportResolver {
  constructor(private readonly passportService: PassportService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Passport)
  public async editPassport(
    @Args('input', { type: () => PassportInput }) input: PassportInput,
    @CurrentUser() user: User,
  ): Promise<Passport> {
    return this.passportService.editPassport(user.id, input);
  }
}
