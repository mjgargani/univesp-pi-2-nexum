// prisma/seed.ts

import { PrismaClient, RoleTemplateName } from '../generated/client';
import { hash } from 'bcrypt';

// Inicializa o Prisma Client
const prisma = new PrismaClient();

/**
 * Limpa todas as tabelas do banco de dados na ordem correta
 * para evitar conflitos de chave estrangeira.
 */
async function clearDatabase() {
  console.log('🧹 Limpando o banco de dados...');
  // A ordem de exclusão é "de filho para pai"
  await prisma.$transaction([
    prisma.partTemplateServiceTemplate.deleteMany(),
    prisma.orderStatus.deleteMany(),
    prisma.serviceStep.deleteMany(),
    prisma.order.deleteMany(),
    prisma.userVehicleTemplate.deleteMany(),
    prisma.partTemplate.deleteMany(), // Limpa a tabela de junção M:N implícita com Supplier
    prisma.serviceTemplate.deleteMany(),
    prisma.vehicleTemplate.deleteMany(),
    prisma.manufacturer.deleteMany(),
    // Tabelas M:N implícitas são limpas ao deletar os pais
    // mas limpamos os "órfãos" se houver
    prisma.address.deleteMany(),
    prisma.contact.deleteMany(),
    prisma.supplier.deleteMany(), // Limpa M:N implícito com Address/Contact
    prisma.user.deleteMany(), // Limpa M:N implícito com Address/Contact/Role
    prisma.roleTemplate.deleteMany(),
    prisma.orderCounter.deleteMany(),
  ]);
  console.log('🧼 Banco de dados limpo.');
}

/**
 * Popula o banco de dados com dados de teste.
 */
async function seedDatabase() {
  console.log('🌱 Iniciando o seeding...');

  // --- 1. OrderCounter ---
  const orderCounter = await prisma.orderCounter.upsert({
    where: { id: 1 },
    create: { id: 1, lastOrder: 1000 },
    update: { lastOrder: 1000 },
  });
  console.log(`-> OrderCounter criado/atualizado (lastOrder: ${orderCounter.lastOrder}).`);

  // --- 2. RoleTemplates ---
  const [adminRole, managerRole, customerRole] = await Promise.all([
    prisma.roleTemplate.upsert({
      where: { name: RoleTemplateName.ADMIN },
      create: { name: RoleTemplateName.ADMIN, complement: 'Acesso total' },
      update: {},
    }),
    prisma.roleTemplate.upsert({
      where: { name: RoleTemplateName.MANAGER },
      create: { name: RoleTemplateName.MANAGER, complement: 'Acesso de gerente' },
      update: {},
    }),
    prisma.roleTemplate.upsert({
      where: { name: RoleTemplateName.CUSTOMER },
      create: { name: RoleTemplateName.CUSTOMER, complement: 'Acesso de cliente' },
      update: {},
    }),
  ]);
  console.log('-> RoleTemplates criados (ADMIN, MANAGER, CUSTOMER).');

  // --- 3. Manufacturer e VehicleTemplate ---
  const manufacturer = await prisma.manufacturer.upsert({
    where: { name: 'Generic Manufacturer (Seed)' },
    create: { name: 'Generic Manufacturer (Seed)', complement: 'Seed data' },
    update: {},
  });

  const vehicleTemplate = await prisma.vehicleTemplate.upsert({
    where: { name: 'Generic Model (Seed)' },
    create: {
      name: 'Generic Model (Seed)',
      manufacturerId: manufacturer.id,
      complement: 'Seed data',
    },
    update: {},
  });
  console.log('-> Manufacturer e VehicleTemplate criados.');

  // --- 4. Supplier (com Endereço e Contato) ---
  const supplier = await prisma.supplier.upsert({
    where: { companyName: 'Fornecedor Padrão (Seed)' },
    create: {
      companyName: 'Fornecedor Padrão (Seed)',
      document: '00.000.000/0001-00', // Documento único
      addresses: {
        create: {
          street: 'Rua Fornecedor (Placeholder)',
          number: '456',
          neighborhood: 'Bairro Fornecedor',
          city: 'São Roque',
          state: 'SP',
          zipCode: '18130-001',
          country: 'Brasil',
        },
      },
      contacts: {
        create: {
          type: 'MAIL', // Enum 'MAIL'
          content: 'contato@fornecedor-seed.com',
        },
      },
    },
    update: {},
  });
  console.log('-> Supplier (com Address e Contact) criado.');

  // --- 5. ServiceTemplate (com ServiceSteps) ---
  const serviceTemplate1 = await prisma.serviceTemplate.upsert({
    where: { name: 'Troca de Óleo e Filtro (Seed)' },
    create: {
      name: 'Troca de Óleo e Filtro (Seed)',
      value: 150.0,
      complement: 'Serviço de rotina',
      steps: {
        // Criação aninhada de ServiceSteps
        create: [
          { stepNumber: 1, name: 'Drenar óleo antigo', estimatedDuration: 15 },
          { stepNumber: 2, name: 'Substituir filtro de óleo', estimatedDuration: 10 },
          { stepNumber: 3, name: 'Abastecer com óleo novo', estimatedDuration: 10 },
        ],
      },
    },
    update: {},
  });
  console.log('-> ServiceTemplate (com 3 ServiceSteps) criado.');

  // --- 6. PartTemplate (conectado ao Supplier e ServiceTemplate) ---
  const partTemplate1 = await prisma.partTemplate.upsert({
    where: { name: 'Filtro de Óleo Genérico (Seed)' },
    create: {
      name: 'Filtro de Óleo Genérico (Seed)',
      value: 75.5,
      suppliers: {
        // Conexão M:N implícita com Supplier
        connect: { id: supplier.id },
      },
      serviceTemplates: {
        // Conexão M:N explícita
        create: [
          {
            serviceTemplate: {
              connect: { id: serviceTemplate1.id },
            },
            complement: 'Peça principal para troca de óleo',
          },
        ],
      },
    },
    update: {},
  });
  console.log('-> PartTemplate (conectado ao Supplier e ServiceTemplate) criado.');

  // --- 7. Usuário Admin (com Endereço, Contato e Veículo) ---
  const adminHashedPassword = await hash('Admin@123', 10);
  const adminUser = await prisma.user.upsert({
    where: { userName: 'admin' },
    create: {
      userName: 'admin',
      firstName: 'Admin',
      lastName: 'Seed',
      document: '000.000.000-00', // Documento único
      password: adminHashedPassword,
      birthDate: new Date('1990-01-01T00:00:00Z'),
      roles: { connect: { id: adminRole.id } },
      addresses: {
        create: {
          street: 'Rua Admin (Placeholder)',
          number: '123',
          neighborhood: 'Bairro Admin',
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
        // Criação aninhada de UserVehicleTemplate
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

  // --- 8. Usuário Customer (com Veículo) ---
  const customerHashedPassword = await hash('Customer@123', 10);
  const customerUser = await prisma.user.upsert({
    where: { userName: 'customer' },
    create: {
      userName: 'customer',
      firstName: 'Cliente',
      lastName: 'Teste',
      document: '111.111.111-11',
      password: customerHashedPassword,
      birthDate: new Date('1995-05-05T00:00:00Z'),
      roles: { connect: { id: customerRole.id } },
      vehicles: {
        create: {
          year: 2020,
          color: 'Branco',
          complement: 'Veículo do cliente (Seed)',
          vehicleTemplateId: vehicleTemplate.id,
        },
      },
    },
    update: {},
  });
  console.log('-> Usuário Customer (com Vehicle) criado.');

  // --- 9. Order (com OrderStatus) ---
  // Pega o veículo do cliente que acabamos de criar
  const customerVehicle = await prisma.userVehicleTemplate.findFirst({
    where: { userId: customerUser.id },
  });

  if (customerVehicle) {
    await prisma.order.upsert({
      where: { number: 1001 },
      create: {
        number: 1001,
        scheduled: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // Agendado para daqui a 3 dias
        conclusion: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 + 45 * 60 * 1000), // 45 min de duração
        budget: serviceTemplate1.value + partTemplate1.value,
        value: serviceTemplate1.value + partTemplate1.value,
        userVehicleTemplateId: customerVehicle.id, // Conexão N:1
        services: {
          // Conexão M:N implícita
          connect: { id: serviceTemplate1.id },
        },
        statuses: {
          // Criação aninhada de OrderStatus
          create: {
            name: 'Agendado',
            complement: 'Pedido criado via seed',
          },
        },
      },
      update: {},
    });
    console.log('-> Order (com OrderStatus "Agendado") criada para o Customer.');
  }

  console.log('✅ Seeding concluído com sucesso!');
}

async function main() {
  try {
    // 1. Limpa o banco
    await clearDatabase();
    // 2. Popula o banco
    await seedDatabase();
  } catch (e) {
    console.error('Erro durante o seeding:', e);
    process.exit(1);
  } finally {
    // 3. Fecha a conexão
    await prisma.$disconnect();
  }
}

// Executa a função main
main();
