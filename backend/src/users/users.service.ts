import { Injectable } from '@nestjs/common';
import { Prisma, User } from 'generated/client';
import { AddressesService } from 'src/addresses/addresses.service';
import { ContactsService } from 'src/contacts/contacts.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common/exceptions';

// https://docs.nestjs.com/recipes/prisma#use-prisma-client-in-your-nestjs-services

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly contactsService: ContactsService,
    private readonly addressesService: AddressesService,
  ) {}

  findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  findOne(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async create(dto: CreateUserDto): Promise<User> {
    const { contacts, addresses, ...userData } = dto;
    
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    try {
      return await this.prisma.$transaction(async (tx) => {
        const user = await tx.user.create({
          data: {
            ...userData,
            password: hashedPassword,
          },
        });

        if (contacts && contacts.length > 0) {
          await this.contactsService.createManyForUser(user.id, contacts, tx);
        }

        if (addresses && addresses.length > 0) {
          await this.addressesService.createManyForUser(user.id, addresses, tx);
        }

        return user;
      });
    } catch (error) {
      throw new InternalServerErrorException('Falha ao criar usuário.', {
        cause: error,
      });
    }
  }

  update(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User | null> {
    return this.prisma.user.update({
      where: params.where,
      data: params.data,
    });
  }

  remove(id: string): Promise<User | null> {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
    