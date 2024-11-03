import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { MockPrismaType, prismaMockFactory } from '../../test/test.mocker';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let prismaService: MockPrismaType;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: PrismaService, useFactory: prismaMockFactory },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    prismaService = module.get(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
