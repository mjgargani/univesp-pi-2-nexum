/*
  Warnings:

  - You are about to drop the column `service_template_id` on the `part_templates` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `part_templates` DROP FOREIGN KEY `part_templates_service_template_id_fkey`;

-- DropIndex
DROP INDEX `part_templates_service_template_id_fkey` ON `part_templates`;

-- AlterTable
ALTER TABLE `part_templates` DROP COLUMN `service_template_id`;

-- CreateTable
CREATE TABLE `part_template_service_template` (
    `complement` VARCHAR(191) NULL,
    `part_template_id` VARCHAR(191) NOT NULL,
    `service_template_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`part_template_id`, `service_template_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `part_template_service_template` ADD CONSTRAINT `part_template_service_template_part_template_id_fkey` FOREIGN KEY (`part_template_id`) REFERENCES `part_templates`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `part_template_service_template` ADD CONSTRAINT `part_template_service_template_service_template_id_fkey` FOREIGN KEY (`service_template_id`) REFERENCES `service_templates`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
