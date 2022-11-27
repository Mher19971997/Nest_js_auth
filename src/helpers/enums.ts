import { registerEnumType } from '@nestjs/graphql';

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

registerEnumType(Gender, {
  name: 'Gender',
});

export enum OrderStatus {
  CREATED = 'CREATED',
  NEW = 'NEW',
  IN_PROGRESS = 'IN_PROGRESS',
  CANCELED = 'CANCELED',
  ARCHIVED = 'ARCHIVED',
  READY = 'READY',
}

registerEnumType(OrderStatus, {
  name: 'OrderStatus',
});

export enum UserRole {
  CUSTOMER = 'CUSTOMER',
  NURSE = 'NURSE',
  ADMIN = 'ADMIN',
}

registerEnumType(UserRole, {
  name: 'UserRole',
});

export enum SlotGroup {
  MORNING = 'MORNING',
  DAY = 'DAY',
  EVENING = 'EVENING',
}

registerEnumType(SlotGroup, {
  name: 'SlotGroup',
});

export enum Laboratory {
  GEMOTEST = 'GEMOTEST',
  DIALAB = 'DIALAB',
}

registerEnumType(Laboratory, {
  name: 'Laboratories',
});
