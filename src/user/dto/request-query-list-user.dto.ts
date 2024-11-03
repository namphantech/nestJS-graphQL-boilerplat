import { Args, ArgsType } from '@nestjs/graphql';
import { PaginationDto } from '../../common/pagination.dto';

@ArgsType()
export class RequestQueryListUserDto  extends  PaginationDto{}