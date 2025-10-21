import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ContactsService],
  exports: [ContactsService],
})
export class ContactsModule {}
