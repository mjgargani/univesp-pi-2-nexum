import { Injectable } from '@nestjs/common';
import { Prisma, User } from 'generated/client';
import { AddressesService } from 'src/addresses/addresses.service';
import { ContactsService } from 'src/contacts/contacts.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException, UnauthorizedException } from '@nestjs/common/exceptions';
import { UpdateUserDto } from './dto/update-user.dto';

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
    } catch (cause) {
      throw new InternalServerErrorException(`Falha ao criar o usuário '${dto.user}'.`, {
        cause,
      });
    }
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    const { contacts, addresses, ...userData } = dto;

    const dataToUpdate: Prisma.UserUpdateInput = { ...userData };

    try {
      return await this.prisma.$transaction(async (tx) => {
        if (userData.password && userData.newPassword) {
          // Compara a senha atual antes de atualizar
          const user = await tx.user.findUnique({ where: { id } });
          const isPasswordValid = await bcrypt.compare(userData.password, user.password);
          if (!isPasswordValid) {
            throw new UnauthorizedException('Senha atual inválida.');
          }
          const salt = await bcrypt.genSalt();
          const hashedPassword = await bcrypt.hash(userData.newPassword, salt);
          dataToUpdate.password = hashedPassword;
        } else {
          delete dataToUpdate.password;
        }

        const updatedUser = await tx.user.update({
          where: { id },
          data: dataToUpdate,
        });

        if (contacts !== undefined) {
          await tx.userContact.deleteMany({
            where: { userId: id },
          });
          if (contacts.length > 0) {
            await this.contactsService.createManyForUser(id, contacts, tx);
          }
        }

        if (addresses !== undefined) {
          await tx.userAddress.deleteMany({
            where: { userId: id },
          });
          if (addresses.length > 0) {
            await this.addressesService.createManyForUser(id, addresses, tx);
          }
        }

        return updatedUser;
      });
    } catch (cause) {
      throw new InternalServerErrorException(`Falha ao atualizar o usuário '${id}'.`, {
        cause,
      });
    }
  }

  async remove(id: string): Promise<User | null> {
    try {
      return await this.prisma.$transaction(async (tx) => {
        await tx.userContact.updateMany({
          where: { userId: id },
          data: {
            active: false,
          },
        });
        await tx.userAddress.updateMany({
          where: { userId: id },
          data: {
            active: false,
          },
        });
        return await tx.user.update({
          where: { id },
          data: {
            active: false,
          },
        });
      });
    } catch (cause) {
      throw new InternalServerErrorException(`Falha ao desativar o usuário '${id}'.`, {
        cause,
      });
    }
  }
}
