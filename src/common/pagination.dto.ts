import { IsInt, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ArgsType, Field, Int } from '@nestjs/graphql';
@ArgsType()
export class PaginationDto {
   @IsOptional()
   @Type(() => Number)
   @IsInt({ message: 'Page must be an integer number' })
   @Min(1, { message: 'Page must not be less than 1' })
   @Field(() => Int)
   page?: number =1;


   @Type(() => Number)
   @IsInt({ message: 'Take must be an integer number' })
   @Min(1, { message: 'Take must not be less than 1' })
   @IsOptional()
   @Field(() => Int, { nullable: true })
   take?: number = 10;
}