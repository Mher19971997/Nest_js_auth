import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsOptional, IsString, Length } from 'class-validator';

@ObjectType('PassportInput', { isAbstract: true })
@InputType('PassportInput', { isAbstract: true })
export class PassportInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @Length(9)
  passportNumber?: string;
}
