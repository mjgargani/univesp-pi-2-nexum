import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ContactsService {
  constructor(private readonly prisma: PrismaService) {}

  async createManyForUser(
    userId: string,
    dtos: CreateContactDto[],
    tx: Omit<PrismaClient, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends">
  ) {
    const createdContacts = [];
    for (const dto of dtos) {
      const contact = await tx.contact.create({ data: dto });
      createdContacts.push(contact);
    }

    const junctionData = createdContacts.map((contact) => ({
      userId: userId,
      contactId: contact.id,
    }));

    return tx.userContact.createMany({
      data: junctionData,
    });
  }
}
