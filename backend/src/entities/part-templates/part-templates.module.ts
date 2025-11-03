import { Module } from '@nestjs/common';
import { PartTemplatesService } from './part-templates.service';
import { PartTemplatesController } from './part-templates.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { SuppliersModule } from '../suppliers/suppliers.module';

@Module({
  imports: [PrismaModule, SuppliersModule],
  controllers: [PartTemplatesController],
  providers: [PartTemplatesService],
})
export class PartTemplatesModule {}
