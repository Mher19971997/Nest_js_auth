import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';
import { Address } from 'src/addresses/addresses.entity';
import { Gender, UserRole } from 'src/helpers/enums';
import { Passport } from 'src/passport/passport.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
@ObjectType('User')
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: string;

  @Column({ nullable: true })
  password?: string;

  @Column('int', { name: 'passport_id', nullable: true })
  @Field(() => ID, { nullable: true })
  passportId: string;

  @Column('varchar', { unique: true, name: 'username', nullable: true })
  @Field({ nullable: true })
  username?: string;

  @Column('date', { name: 'birthday', nullable: true })
  @Field(() => String, { nullable: true })
  birthday?: Date;

  @Column({
    type: 'enum',
    enum: Gender,
    nullable: true,
    default: null,
  })
  @Field(() => Gender, { nullable: true, defaultValue: null })
  gender?: Gender;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.CUSTOMER,
  })
  role: UserRole;

  @Column('varchar', { unique: true, name: 'email', nullable: true })
  @Field({ nullable: true })
  email?: string;

  @Column('varchar', { name: 'phone_code', nullable: true })
  @Field({ nullable: true })
  phoneCode?: string;

  @Column('boolean', { name: 'phone_is_verified', default: false })
  @Field({ defaultValue: false })
  phoneIsVerified?: boolean;

  @Column('boolean', { name: 'email_is_confirmed', default: false })
  @Field({ defaultValue: false })
  emailIsConfirmed?: boolean;

  @Column('varchar', { name: 'avatar', nullable: true })
  @Field({ nullable: true })
  avatar?: string;

  @Column('varchar', { name: 'phone', nullable: true })
  @Field({ nullable: true })
  phone?: string;

  @Column('text', { name: 'content', nullable: true })
  @Field({ nullable: true })
  content?: string;

  @Column('varchar', { name: 'name_first', nullable: true })
  @Field({ nullable: true })
  nameFirst?: string;

  @Column('varchar', { name: 'name_last', nullable: true })
  @Field({ nullable: true })
  nameLast?: string;

  @Column('varchar', { name: 'name_middle', nullable: true })
  @Field({ nullable: true })
  nameMiddle?: string;

  @Field(() => GraphQLISODateTime)
  @UpdateDateColumn({ name: 'last_login' })
  lastLogin: Date;

  @Field(() => GraphQLISODateTime)
  @CreateDateColumn()
  created: Date;

  @Field(() => GraphQLISODateTime)
  @UpdateDateColumn()
  updated: Date;

  @OneToMany(() => Address, (addres) => addres.user)
  @JoinColumn({ name: 'address_id' })
  addresses: Address[];

  @OneToOne(() => Passport, (passport) => passport.user)
  @JoinColumn({ name: 'passport_id' })
  @Field({ nullable: true })
  passport?: Passport;
}
