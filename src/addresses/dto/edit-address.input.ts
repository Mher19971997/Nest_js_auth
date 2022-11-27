import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import {
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

@ObjectType('EditAddressInput')
@InputType('EditAddressInput')
export class EditAddressInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(120)
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(120)
  country?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(120)
  city?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(120)
  address?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  entrance?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  floor?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  apartment?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(400)
  comment?: string;
}
