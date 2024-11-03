import { Field, ObjectType } from '@nestjs/graphql';
import { PaginationResponseDto } from '../../common/pagination.response.dto';
import { User } from './user.response';

@ObjectType()
export class GetListUserResponseDto extends  PaginationResponseDto{
  @Field(type => [User])
  results: User[]
}