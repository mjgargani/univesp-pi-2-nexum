-- DropForeignKey
ALTER TABLE `vehicle_templates` DROP FOREIGN KEY `vehicle_templates_manufacturer_id_fkey`;

-- DropIndex
DROP INDEX `vehicle_templates_manufacturer_id_fkey` ON `vehicle_templates`;

-- AlterTable
ALTER TABLE `vehicle_templates` MODIFY `manufacturer_id` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `vehicle_templates` ADD CONSTRAINT `vehicle_templates_manufacturer_id_fkey` FOREIGN KEY (`manufacturer_id`) REFERENCES `manufacturers`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
