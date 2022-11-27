import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { User } from './users.entity';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import { GqlThrottlerGuard } from 'src/sms/sms-auth.guard';
import { forwardRef, Inject, UseGuards } from '@nestjs/common';
import { AuthPayload } from './auth.entity';
import { CurrentUser } from './current-user.guard';
import { JwtAuthGuard } from 'src/auth/jwt-aut.guard';
import { EditProfileInput } from './dto/edit-user.input';
import DataLoader from 'dataloader';
import { Passport } from 'src/passport/passport.entity';
import { PassportService } from 'src/passport/passport.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService,
    @Inject(forwardRef(() => PassportService))
    private readonly passportService: PassportService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => User)
  public async myProfile(@CurrentUser() user: User): Promise<User> {
    return this.usersService.findById(user.id);
  }

  @Query(() => User)
  public async user(
    @Args('id', { type: () => String }) id: string,
  ): Promise<User> {
    return this.usersService.findById(id);
  }

  @UseGuards(GqlThrottlerGuard)
  @Mutation(() => Boolean)
  public async auth(@Args('phone') phone: string) {
    return this.usersService.auth(phone);
  }

  @Mutation(() => AuthPayload)
  public async verify(
    @Args('phone') phone: string,
    @Args('code') code: string,
  ): Promise<AuthPayload> {
    const user = await this.usersService.verify(phone, code);
    const payload = {
      phone: user.phone,
      id: user.id,
    };

    return {
      phone,
      accessToken: this.jwtService.sign(payload),
    };
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => User)
  public async editProfile(
    @Args('input', { type: () => EditProfileInput }) input: EditProfileInput,
    @CurrentUser() user: User,
  ): Promise<User> {
    return this.usersService.editProfile(user.id, input);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => User)
  public async editEmail(
    @Args('email') email: string,
    @CurrentUser() user: User,
  ): Promise<User> {
    return this.usersService.editEmail(user.id, email);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  public async sendEmailConfirmToken(
    @CurrentUser() user: User,
  ): Promise<boolean> {
    return this.usersService.sendEmailConfirmToken(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  public async resendConfirmationLink(
    @CurrentUser() user: User,
  ): Promise<boolean> {
    return this.usersService.resendConfirmationLink(user.id);
  }

  @Mutation(() => Boolean)
  public async checkEmailIsEmpty(
    @Args('email') email: string,
  ): Promise<boolean> {
    return !(await this.usersService.getByValidEmail(email));
  }

  @ResolveField('passport', () => Passport)
  async passport(
    @Parent() user: User,
    @Context('passportIdsLoader')
    passportIdsLoader: DataLoader<string, User>,
  ) {
    const { passportId } = user;
    if (passportId) return passportIdsLoader.load(passportId);
    return null;
  }
}
