import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { PrismaModule } from '../prisma/prisma.module';
import { PostModule } from '../post/post.module';

@Module({
  imports: [PrismaModule, PostModule],
  providers: [ UserService, UserResolver],
})
export class UserModule {}
