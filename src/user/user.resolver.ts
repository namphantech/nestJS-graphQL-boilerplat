import { Resolver, Query, Mutation, Args, Int, ID, Parent, ResolveField } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './dto/user.response';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { RequestQueryListUserDto } from './dto/request-query-list-user.dto';
import { GetListUserResponseDto } from './dto/get-list-user.response.dto';
import { ParseIntPipe } from '@nestjs/common';
import { PostService } from '../post/post.service';
import { Post } from '../post/dto/post.response';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService,private  readonly  postService: PostService) {}

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return await this.userService.createUser(createUserInput);
  }

  @Query(() => GetListUserResponseDto, {name: 'users'})
  async listUsers(@Args() arg:RequestQueryListUserDto) {
    return this.userService.listUsers(arg);
  }

  @Query(() => User, { name: 'user' })
  async findUser(
    @Args('id', { type: () => Int }, new ParseIntPipe()) id: number,
  ) {
    return await this.userService.findUserById(id);
  }

  @ResolveField('posts', ()=> [Post])
  async listUserPosts(@Parent() user: User){
    const  {id} = user;
    return await this.postService.findPostsByUserId(id)
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.updateUser(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => String)
  removeUser(@Args('id', { type: () => ID }) id: number) {
    return this.userService.removeUser(+id);
  }

  @Query((returns) => String)
  helloWorld() {
    console.log('HERE!');

    return 'Hello World';
  }
}
