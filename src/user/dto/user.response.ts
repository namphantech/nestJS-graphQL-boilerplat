import { ObjectType, Field } from '@nestjs/graphql';
import { Post } from '../../post/dto/post.response';
@ObjectType()
export class User {
  @Field()
  id: number;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => [Post], { nullable: 'itemsAndList' })
  posts?: Post[];
}
