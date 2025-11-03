import { Module } from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { SuppliersController } from './suppliers.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ContactsModule } from '../contacts/contacts.module';
import { AddressesModule } from '../addresses/addresses.module';

@Module({
  imports: [PrismaModule, ContactsModule, AddressesModule],
  controllers: [SuppliersController],
  providers: [SuppliersService],
})
export class SuppliersModule {}
