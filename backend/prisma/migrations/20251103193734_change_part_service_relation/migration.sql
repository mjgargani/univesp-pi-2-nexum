/*
  Warnings:

  - You are about to drop the `_OrderToPartTemplate` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `service_template_id` to the `part_templates` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_OrderToPartTemplate` DROP FOREIGN KEY `_OrderToPartTemplate_A_fkey`;

-- DropForeignKey
ALTER TABLE `_OrderToPartTemplate` DROP FOREIGN KEY `_OrderToPartTemplate_B_fkey`;

-- AlterTable
ALTER TABLE `part_templates` ADD COLUMN `service_template_id` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `_OrderToPartTemplate`;

-- AddForeignKey
ALTER TABLE `part_templates` ADD CONSTRAINT `part_templates_service_template_id_fkey` FOREIGN KEY (`service_template_id`) REFERENCES `service_templates`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
