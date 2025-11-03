import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ContactsModule } from 'src/entities/contacts/contacts.module';
import { AddressesModule } from 'src/entities/addresses/addresses.module';

@Module({
  imports: [PrismaModule, ContactsModule, AddressesModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
