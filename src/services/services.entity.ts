import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('services')
@ObjectType('Services')
export class Services {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: string;

  @PrimaryColumn('varchar', { name: 'key' })
  @Field({ nullable: false })
  key: string;

  @Column('varchar', { name: 'title', nullable: false })
  @Field({ nullable: false })
  title: string;

  @Column('text', { name: 'value', nullable: true })
  @Field({ nullable: true })
  value?: string;
}
