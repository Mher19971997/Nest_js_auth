import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'src/users/users.entity';

@Entity('passport')
@ObjectType('Passport')
export class Passport {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: string;

  @Column('varchar', { name: 'passport_number', nullable: false })
  @Field({ nullable: false })
  passportNumber: string;

  @Column('varchar', { name: 'passport_issued', nullable: true })
  passportIssued?: string;

  @OneToOne(() => User, (user) => user.passport)
  @JoinColumn({ name: 'id' })
  user: User;

  @Column({ name: 'snils', nullable: true })
  @Field({ nullable: true })
  snils?: string;

  @Column({ name: 'oms', nullable: true })
  @Field({ nullable: true })
  oms?: string;

  @Column({ name: 'dms', nullable: true })
  @Field({ nullable: true })
  dms?: string;

  @Column({ name: 'dmc_company_name', nullable: true })
  @Field({ nullable: true })
  dmcCompanyName?: string;
}
