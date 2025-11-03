// prisma/seed.ts

import { PrismaClient } from '../generated/client';
import { hash } from 'bcrypt';

// Inicializa o Prisma Client
const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Iniciando o seeding do banco de dados...');

  // --- 1. OrderCounter ---
  await prisma.orderCounter.upsert({
    where: { id: 1 },
    create: { id: 1, lastOrder: 1000 },
    update: { lastOrder: 1000 },
  });
  console.log('-> OrderCounter criado/atualizado.');

  // --- 2. OrderStatus (Pulado) ---
  console.log('-> OrderStatus (pulado - tabela de instância).');

  // --- 3. Manufacturer e VehicleTemplate ---
  const manufacturer = await prisma.manufacturer.upsert({
    where: { name: 'Generic Manufacturer (Seed)' }, // (Requer @unique) [cite: 3]
    create: { name: 'Generic Manufacturer (Seed)', complement: 'Seed data' },
    update: {},
  });

  const vehicleTemplate = await prisma.vehicleTemplate.upsert({
    where: { name: 'Generic Model (Seed)' }, // (Requer @unique) [cite: 7]
    create: {
      name: 'Generic Model (Seed)',
      manufacturerId: manufacturer.id,
      complement: 'Seed data',
    },
    update: {},
  });
  console.log('-> Manufacturer e VehicleTemplate criados.');

  // --- 4. RoleTemplate 'ADMIN' ---
  const adminRole = await prisma.roleTemplate.upsert({
    where: { name: 'ADMIN' },
    create: { name: 'ADMIN', complement: 'Acesso total ao sistema' },
    update: {},
  });
  console.log('-> RoleTemplate ADMIN criado.');

  // --- 5. Usuário Administrador (com Endereço, Contato e Veículo) ---
  const hashedPassword = await hash('Admin@123', 10);
  await prisma.user.upsert({
    where: { userName: 'admin' },
    create: {
      userName: 'admin',
      firstName: 'Admin',
      lastName: 'Seed',
      document: '000.000.000-00',
      password: hashedPassword,
      birthDate: new Date('1990-01-01T00:00:00Z'),
      roles: { connect: { id: adminRole.id } },
      addresses: {
        create: {
          street: 'Rua Admin (Placeholder)',
          number: '123',
          neighborhood: 'Bairro Admin (Placeholder)', // <-- CORREÇÃO 1 (Erro 1)
          city: 'São Roque',
          state: 'SP',
          zipCode: '18130-000',
          country: 'Brasil',
        },
      },
      contacts: {
        create: {
          type: 'PHONE',
          content: '+5511999999999',
        },
      },
      vehicles: {
        create: {
          year: 2023,
          color: 'Preto',
          complement: 'Veículo do admin (Seed)',
          vehicleTemplateId: vehicleTemplate.id,
        },
      },
    },
    update: {},
  });
  console.log('-> Usuário Admin (com Address, Contact, Vehicle) criado.');

  // --- 6. Service, Supplier e Part ---
  const serviceTemplate = await prisma.serviceTemplate.upsert({
    where: { name: 'Serviço Padrão (Seed)' }, // (Requer @unique) [cite: 5]
    create: {
      name: 'Serviço Padrão (Seed)',
      value: 150.0,
      complement: 'Serviço de seed',
    },
    update: {},
  });

  const supplier = await prisma.supplier.upsert({
    where: { companyName: 'Fornecedor Padrão (Seed)' }, // CORRIGIDO: Usando companyName
    create: {
      companyName: 'Fornecedor Padrão (Seed)', // (Requer @unique)
      document: '00.000.000/0001-00',
      addresses: {
        create: {
          street: 'Rua Fornecedor (Placeholder)',
          number: '456',
          neighborhood: 'Bairro Fornecedor (Placeholder)', // <-- CORREÇÃO 2 (Erro 2)
          city: 'São Roque',
          state: 'SP',
          zipCode: '18130-001',
          country: 'Brasil',
        },
      },
      contacts: {
        create: {
          type: 'MAIL',
          content: 'contato@fornecedor-seed.com',
        },
      },
    },
    update: {},
  });

  await prisma.partTemplate.upsert({
    where: { name: 'Peça Padrão (Seed)' }, // (Requer @unique) [cite: 4]
    create: {
      name: 'Peça Padrão (Seed)',
      value: 75.5,
      serviceTemplateId: serviceTemplate.id,
      suppliers: {
        connect: { id: supplier.id },
      },
    },
    update: {},
  });
  console.log('-> ServiceTemplate, Supplier e PartTemplate criados.');

  console.log('✅ Seeding concluído com sucesso!');
}

main()
  .catch(async (e) => {
    console.error('Erro durante o seeding:', e);
    await prisma.$disconnect();
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
