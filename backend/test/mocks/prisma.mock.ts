export const createPrismaMock = () => {
  const mockTx = {
    user: {
      create: jest.fn(),
    },
    contact: {
      create: jest.fn(),
    },
    userContact: {
      createMany: jest.fn(),
    },
    address: {
      create: jest.fn(),
    },
    userAddress: {
      createMany: jest.fn(),
    },
  }

  const mockPrismaService = {
    $transaction: jest.fn().mockImplementation(async (callback) => {
      return await callback(mockTx);
    }),

    user: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  }

  return { mockPrismaService, mockTx };
}