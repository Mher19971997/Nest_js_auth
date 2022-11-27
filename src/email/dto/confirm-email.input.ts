import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@ObjectType('ConfirmEmailInput')
@InputType('ConfirmEmailInput')
export class ConfirmEmailInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  token: string;
}
