import { Module } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [AddressesService],
  exports: [AddressesService],
})
export class AddressesModule {}
