import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ContactsService } from 'src/contacts/contacts.service';
import { AddressesService } from 'src/addresses/addresses.service';
import { createPrismaMock } from '../../test/mocks/prisma.mock';
import { CreateUserDto } from './dto/create-user.dto';

const mockContactsService = {
  createManyForUser: jest.fn(),
};

const mockAddressesService = {
  createManyForUser: jest.fn(),
};

describe('UsersService', () => {
  let service: UsersService;
  let prisma: PrismaService;
  let tx;

  beforeEach(async () => {
    const { mockPrismaService, mockTx } = createPrismaMock();
    tx = mockTx;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
        {
          provide: ContactsService,
          useValue: mockContactsService,
        },
        {
          provide: AddressesService,
          useValue: mockAddressesService,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a user with contacts and addresses', async () => {
    const createUserDto: CreateUserDto = {
      user: 'testuser',
      password: 'password123',
      document: '12345678900',
      firstName: 'John',
      lastName: 'Doe',
      contacts: [{ type: 'MAIL', content: 'john.doe@example.com' }],
      addresses: [
        {
          street: '123 Main St',
          number: '100',
          neighborhood: 'Downtown',
          city: 'Anytown',
          state: 'CA',
          country: 'USA',
          zipCode: '12345',
        },
      ],
    };
    const mockUser = { id: '508fd267-c22d-4d82-8459-4196a1ee66a8', ...createUserDto };

    tx.user.create.mockResolvedValue(mockUser);

    await service.create(createUserDto);

    expect(prisma.$transaction).toHaveBeenCalledTimes(1);

    expect(tx.user.create).toHaveBeenCalledTimes(1);

    expect(mockContactsService.createManyForUser).toHaveBeenCalledTimes(1);
  });
});
