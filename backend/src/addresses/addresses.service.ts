import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AddressesService {
  constructor(private readonly prisma: PrismaService) {}
  
  async createManyForUser(
    userId: string,
    dtos: CreateAddressDto[],
    tx: Omit<PrismaClient, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends">
  ) {
    const createdAddresses = [];
    for (const dto of dtos) {
      const contact = await tx.address.create({ data: dto });
      createdAddresses.push(contact);
    }

    const junctionData = createdAddresses.map((address) => ({
      userId: userId,
      addressId: address.id,
    }));

    return tx.userAddress.createMany({
      data: junctionData,
    });
  }
}
