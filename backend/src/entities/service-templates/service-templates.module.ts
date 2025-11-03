import { Module } from '@nestjs/common';
import { ServiceTemplatesService } from './service-templates.service';
import { ServiceTemplatesController } from './service-templates.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ServiceTemplatesService],
  controllers: [ServiceTemplatesController],
})
export class ServiceTemplatesModule {}
