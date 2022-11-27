import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('AuthPayload')
export class AuthPayload {
  @Field()
  accessToken: string;

  @Field()
  phone: string;
}
