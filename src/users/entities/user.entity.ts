import { ObjectType, Field } from '@nestjs/graphql';
import { BaseEntity } from '../../common/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @Column()
  @Field(() => String)
  firstName: string;

  @Column()
  @Field(() => String)
  lastName: string;

  @Column()
  @Field(() => String)
  email: string;
}
