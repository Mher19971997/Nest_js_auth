import {
  Field,
  GraphQLISODateTime,
  ID,
  Int,
  ObjectType,
} from '@nestjs/graphql';
import { User } from 'src/users/users.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('addresses')
@ObjectType('Address')
export class Address {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: string;

  @Column('int', { name: 'user_id', nullable: false })
  @Field({ nullable: false })
  userId: string;

  @Column('varchar', { name: 'name', nullable: true })
  @Field({ nullable: true })
  name?: string;

  @Column('varchar', { name: 'country', nullable: true })
  @Field({ nullable: true })
  country?: string;

  @Column('varchar', { name: 'city', nullable: true })
  @Field({ nullable: true })
  city?: string;

  @Column('varchar', { name: 'address', nullable: false })
  @Field({ nullable: false })
  address: string;

  @Column('integer', { nullable: true })
  @Field(() => Int, { nullable: true })
  entrance?: number;

  @Column('integer', { nullable: true })
  @Field(() => Int, { nullable: true })
  floor?: number;

  @Column('integer', { nullable: true })
  @Field(() => Int, { nullable: true })
  apartment?: number;

  @Column('text', { nullable: true })
  @Field({ nullable: true })
  comment?: string;

  @Column('boolean', { name: 'is_primary', default: false })
  @Field({ defaultValue: false })
  isPrimary?: boolean;

  @CreateDateColumn()
  @Field(() => GraphQLISODateTime)
  created: Date;

  @UpdateDateColumn()
  @Field(() => GraphQLISODateTime)
  updated: Date;

  @Field(() => GraphQLISODateTime)
  @DeleteDateColumn()
  deleted: Date;

  @ManyToOne(() => User, (user) => user.addresses)
  @Field(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
