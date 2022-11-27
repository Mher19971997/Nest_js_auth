import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  IsDate,
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Gender } from 'src/helpers/enums';

@ObjectType('EditProfileInput', { isAbstract: true })
@InputType('EditProfileInput', { isAbstract: true })
export class EditProfileInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(40)
  username?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(400)
  avatar?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(4000)
  content?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(40)
  nameFirst?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(40)
  nameLast?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(40)
  nameMiddle?: string;

  @Field(() => Gender, { nullable: true })
  @IsOptional()
  gender?: Gender;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  @IsDate()
  birthday?: Date;

  @Field({ nullable: true })
  @IsOptional()
  @IsEmail()
  @MinLength(6)
  @MaxLength(40)
  email?: string;
}
