import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { fetchPaginatedData } from '../utils/fetchPaginatedDataUtils';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { RequestQueryListUserDto } from './dto/request-query-list-user.dto';
import { GetListUserResponseDto } from './dto/get-list-user.response.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(createUserInput: CreateUserInput): Promise<User> {
    console.log(createUserInput);
    const { email, password } = createUserInput;
    const check = await this.prisma.user.findFirst({
      where: { email },
    });
    if (check) {
      throw new BadRequestException('User already exists');
    }
    return  this.prisma.user.create({
      data: { email, password },
      select: {
        id: true,
        email: true,
        password: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async listUsers(
    query: RequestQueryListUserDto,
  ): Promise<GetListUserResponseDto> {
    const page = query.page ?? 1;
    const take = query.take ?? 10;
    const skip = (page - 1) * take;

    const { results, totalItems } = await fetchPaginatedData<User>(
      this.prisma.user,
      {},
      {},
      skip,
      take,
    );

    return {
      offset: skip,
      total: totalItems,
      limit: take,
      results,
    };
  }

  async findUserById(id: number): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: {
        id,
      },
    });
    if (!user) throw new NotFoundException('User Not Found!');

    return user;
  }

  async updateUser(
    id: number,
    updateUserInput: UpdateUserInput,
  ): Promise<User> {
    const { email, password } = updateUserInput;
    const payload = {
      email,
      password,
    };

    await this.ensureUserExists(id);
    return this.prisma.user.update({
      where: { id },
      data: payload,
      select: {
        id: true,
        email: true,
        password: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async ensureUserExists(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throw new NotFoundException(`No user found with id: ${id}`);
    }
  }

  async removeUser(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
