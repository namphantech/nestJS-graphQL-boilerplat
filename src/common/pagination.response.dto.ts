import { Field, Int, ObjectType } from '@nestjs/graphql';
@ObjectType()
export class PaginationResponseDto {
  @Field(() => Int)
  total: number;
  @Field(() => Int)
  limit: number;
  @Field(() => Int)
  offset: number;
}