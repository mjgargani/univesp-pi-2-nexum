// import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
// import { Prisma } from 'generated/client';
// import { PrismaErrorCodes } from 'src/prisma/errorCodes.enum';
// import { PrismaService } from 'src/prisma/prisma.service';
// import { CreatePartTemplateDto } from './dto/create-part-template.dto';

// @Injectable()
// export class PartTemplatesService {
//   constructor(private readonly prisma: PrismaService) {}

//   async findAll() {
//     return this.prisma.partTemplate.findMany();
//   }

//   async findOne(id: string) {
//     return this.prisma.partTemplate.findUnique({ where: { id } });
//   }

//   async create(dto: CreatePartTemplateDto) {
//     let partTemplateId: string;
//     try {
//       const { supplierIds, ...partTemplateData } = dto;

//       await this.prisma.$transaction(async (tx) => {
//         const partTemplate = await tx.partTemplate.create({
//           data: partTemplateData,
//         });

//         partTemplateId = partTemplate.id;

//         if (supplierIds && supplierIds.length > 0) {
//           const connectSuppliers = supplierIds.map((supplierId) => ({
//             id: supplierId,
//           }));

//           await tx.partTemplate.update({
//             where: { id: partTemplate.id },
//             data: {
//               suppliers: {
//                 connect: connectSuppliers,
//               },
//             },
//           });
//         }
//       });

//       return this.findOne(partTemplateId);
//     } catch (cause) {
//       if (cause instanceof UnauthorizedException) {
//         throw new UnauthorizedException('Acesso não autorizado.', { cause });
//       }

//       if (cause instanceof Prisma.PrismaClientKnownRequestError) {
//         if (cause.code === PrismaErrorCodes.RECORD_NOT_FOUND) {
//           throw new NotFoundException(`Usuário '${id}' não encontrado.`, { cause });
//         }
//       }

//       throw new InternalServerErrorException(`Falha interna ao buscar o usuário '${id}'.`, { cause });
//     }
//   }

//   async update(id: string, data: any) {
//     return this.prisma.partTemplate.update({ where: { id }, data });
//   }

//   async activate(id: string) {
//     return this.prisma.partTemplate.update({ where: { id }, data: { active: true } });
//   }

//   async deactivate(id: string) {
//     return this.prisma.partTemplate.update({ where: { id }, data: { active: false } });
//   }

//   async remove(id: string) {
//     return this.prisma.partTemplate.delete({ where: { id } });
//   }
// }
