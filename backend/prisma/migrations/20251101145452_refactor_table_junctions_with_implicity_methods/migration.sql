/*
  Warnings:

  - You are about to drop the column `user_vehicle_template_id` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the `order_part_templates` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `order_service_templates` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `part_templates_suppliers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `suppliers_addresses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `suppliers_contacts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users_addresses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users_contacts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users_role_templates` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users_vehicle_templates` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `order_part_templates` DROP FOREIGN KEY `order_part_templates_order_id_fkey`;

-- DropForeignKey
ALTER TABLE `order_part_templates` DROP FOREIGN KEY `order_part_templates_part_template_id_fkey`;

-- DropForeignKey
ALTER TABLE `order_service_templates` DROP FOREIGN KEY `order_service_templates_order_id_fkey`;

-- DropForeignKey
ALTER TABLE `order_service_templates` DROP FOREIGN KEY `order_service_templates_service_template_id_fkey`;

-- DropForeignKey
ALTER TABLE `orders` DROP FOREIGN KEY `orders_user_vehicle_template_id_fkey`;

-- DropForeignKey
ALTER TABLE `part_templates_suppliers` DROP FOREIGN KEY `part_templates_suppliers_part_template_id_fkey`;

-- DropForeignKey
ALTER TABLE `part_templates_suppliers` DROP FOREIGN KEY `part_templates_suppliers_supplier_id_fkey`;

-- DropForeignKey
ALTER TABLE `suppliers_addresses` DROP FOREIGN KEY `suppliers_addresses_address_id_fkey`;

-- DropForeignKey
ALTER TABLE `suppliers_addresses` DROP FOREIGN KEY `suppliers_addresses_supplier_id_fkey`;

-- DropForeignKey
ALTER TABLE `suppliers_contacts` DROP FOREIGN KEY `suppliers_contacts_contact_id_fkey`;

-- DropForeignKey
ALTER TABLE `suppliers_contacts` DROP FOREIGN KEY `suppliers_contacts_supplier_id_fkey`;

-- DropForeignKey
ALTER TABLE `users_addresses` DROP FOREIGN KEY `users_addresses_address_id_fkey`;

-- DropForeignKey
ALTER TABLE `users_addresses` DROP FOREIGN KEY `users_addresses_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `users_contacts` DROP FOREIGN KEY `users_contacts_contact_id_fkey`;

-- DropForeignKey
ALTER TABLE `users_contacts` DROP FOREIGN KEY `users_contacts_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `users_role_templates` DROP FOREIGN KEY `users_role_templates_role_template_id_fkey`;

-- DropForeignKey
ALTER TABLE `users_role_templates` DROP FOREIGN KEY `users_role_templates_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `users_vehicle_templates` DROP FOREIGN KEY `users_vehicle_templates_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `users_vehicle_templates` DROP FOREIGN KEY `users_vehicle_templates_vehicle_template_id_fkey`;

-- DropForeignKey
ALTER TABLE `vehicle_templates` DROP FOREIGN KEY `vehicle_templates_manufacturer_id_fkey`;

-- DropIndex
DROP INDEX `orders_user_vehicle_template_id_fkey` ON `orders`;

-- DropIndex
DROP INDEX `vehicle_templates_manufacturer_id_fkey` ON `vehicle_templates`;

-- AlterTable
ALTER TABLE `contacts` MODIFY `type` ENUM('PHONE', 'MAIL', 'OTHER') NOT NULL;

-- AlterTable
ALTER TABLE `orders` DROP COLUMN `user_vehicle_template_id`;

-- DropTable
DROP TABLE `order_part_templates`;

-- DropTable
DROP TABLE `order_service_templates`;

-- DropTable
DROP TABLE `part_templates_suppliers`;

-- DropTable
DROP TABLE `suppliers_addresses`;

-- DropTable
DROP TABLE `suppliers_contacts`;

-- DropTable
DROP TABLE `users_addresses`;

-- DropTable
DROP TABLE `users_contacts`;

-- DropTable
DROP TABLE `users_role_templates`;

-- DropTable
DROP TABLE `users_vehicle_templates`;

-- CreateTable
CREATE TABLE `_RoleTemplateToUser` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_RoleTemplateToUser_AB_unique`(`A`, `B`),
    INDEX `_RoleTemplateToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_UserToVehicleTemplate` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_UserToVehicleTemplate_AB_unique`(`A`, `B`),
    INDEX `_UserToVehicleTemplate_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_PartTemplateToSupplier` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_PartTemplateToSupplier_AB_unique`(`A`, `B`),
    INDEX `_PartTemplateToSupplier_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ContactToUser` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_ContactToUser_AB_unique`(`A`, `B`),
    INDEX `_ContactToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ContactToSupplier` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_ContactToSupplier_AB_unique`(`A`, `B`),
    INDEX `_ContactToSupplier_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_AddressToUser` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_AddressToUser_AB_unique`(`A`, `B`),
    INDEX `_AddressToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_AddressToSupplier` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_AddressToSupplier_AB_unique`(`A`, `B`),
    INDEX `_AddressToSupplier_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_OrderToServiceTemplate` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_OrderToServiceTemplate_AB_unique`(`A`, `B`),
    INDEX `_OrderToServiceTemplate_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_OrderToPartTemplate` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_OrderToPartTemplate_AB_unique`(`A`, `B`),
    INDEX `_OrderToPartTemplate_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_OrderToUser` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_OrderToUser_AB_unique`(`A`, `B`),
    INDEX `_OrderToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_OrderToVehicleTemplate` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_OrderToVehicleTemplate_AB_unique`(`A`, `B`),
    INDEX `_OrderToVehicleTemplate_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `vehicle_templates` ADD CONSTRAINT `vehicle_templates_manufacturer_id_fkey` FOREIGN KEY (`manufacturer_id`) REFERENCES `manufacturers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_RoleTemplateToUser` ADD CONSTRAINT `_RoleTemplateToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `role_templates`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_RoleTemplateToUser` ADD CONSTRAINT `_RoleTemplateToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_UserToVehicleTemplate` ADD CONSTRAINT `_UserToVehicleTemplate_A_fkey` FOREIGN KEY (`A`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_UserToVehicleTemplate` ADD CONSTRAINT `_UserToVehicleTemplate_B_fkey` FOREIGN KEY (`B`) REFERENCES `vehicle_templates`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PartTemplateToSupplier` ADD CONSTRAINT `_PartTemplateToSupplier_A_fkey` FOREIGN KEY (`A`) REFERENCES `part_templates`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PartTemplateToSupplier` ADD CONSTRAINT `_PartTemplateToSupplier_B_fkey` FOREIGN KEY (`B`) REFERENCES `suppliers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ContactToUser` ADD CONSTRAINT `_ContactToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `contacts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ContactToUser` ADD CONSTRAINT `_ContactToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ContactToSupplier` ADD CONSTRAINT `_ContactToSupplier_A_fkey` FOREIGN KEY (`A`) REFERENCES `contacts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ContactToSupplier` ADD CONSTRAINT `_ContactToSupplier_B_fkey` FOREIGN KEY (`B`) REFERENCES `suppliers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AddressToUser` ADD CONSTRAINT `_AddressToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `addresses`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AddressToUser` ADD CONSTRAINT `_AddressToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AddressToSupplier` ADD CONSTRAINT `_AddressToSupplier_A_fkey` FOREIGN KEY (`A`) REFERENCES `addresses`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AddressToSupplier` ADD CONSTRAINT `_AddressToSupplier_B_fkey` FOREIGN KEY (`B`) REFERENCES `suppliers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_OrderToServiceTemplate` ADD CONSTRAINT `_OrderToServiceTemplate_A_fkey` FOREIGN KEY (`A`) REFERENCES `orders`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_OrderToServiceTemplate` ADD CONSTRAINT `_OrderToServiceTemplate_B_fkey` FOREIGN KEY (`B`) REFERENCES `service_templates`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_OrderToPartTemplate` ADD CONSTRAINT `_OrderToPartTemplate_A_fkey` FOREIGN KEY (`A`) REFERENCES `orders`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_OrderToPartTemplate` ADD CONSTRAINT `_OrderToPartTemplate_B_fkey` FOREIGN KEY (`B`) REFERENCES `part_templates`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_OrderToUser` ADD CONSTRAINT `_OrderToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `orders`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_OrderToUser` ADD CONSTRAINT `_OrderToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_OrderToVehicleTemplate` ADD CONSTRAINT `_OrderToVehicleTemplate_A_fkey` FOREIGN KEY (`A`) REFERENCES `orders`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_OrderToVehicleTemplate` ADD CONSTRAINT `_OrderToVehicleTemplate_B_fkey` FOREIGN KEY (`B`) REFERENCES `vehicle_templates`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
