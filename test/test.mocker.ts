import { Prisma } from '@prisma/client';

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<object | null | string | number | boolean>;
};

export type MockPrismaType = {
  user?: MockType<Prisma.UserDelegate>;
};

const prismaEntityMockFactory = () => ({
  findFirst: jest.fn(),
  create: jest.fn(),
  findMany: jest.fn(),
  count: jest.fn(),
  findUnique: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
  aggregate: jest.fn(),
  createMany: jest.fn(),
  updateMany: jest.fn(),
  upsert: jest.fn(),
});

export const prismaMockFactory = () => {
  return {
    user: prismaEntityMockFactory(),
  };
};

// Services mock factories
export const customerServiceMockFactory = () => ({
  createUser: jest.fn(),
  listUsers: jest.fn(),
  updateUser: jest.fn(),
  ensureUserExists: jest.fn(),
  removeUser: jest.fn(),
});
