/*
  Warnings:

  - You are about to drop the column `active` on the `addresses` table. All the data in the column will be lost.
  - You are about to drop the column `active` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `active` on the `order_statuses` table. All the data in the column will be lost.
  - You are about to drop the column `active` on the `part_templates` table. All the data in the column will be lost.
  - You are about to drop the column `active` on the `role_templates` table. All the data in the column will be lost.
  - You are about to alter the column `name` on the `role_templates` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(1))`.
  - You are about to drop the column `active` on the `service_steps` table. All the data in the column will be lost.
  - You are about to drop the column `active` on the `service_templates` table. All the data in the column will be lost.
  - You are about to drop the column `active` on the `vehicle_templates` table. All the data in the column will be lost.
  - You are about to drop the `_OrderToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_OrderToVehicleTemplate` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_UserToVehicleTemplate` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `user_vehicle_template_id` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_OrderToUser` DROP FOREIGN KEY `_OrderToUser_A_fkey`;

-- DropForeignKey
ALTER TABLE `_OrderToUser` DROP FOREIGN KEY `_OrderToUser_B_fkey`;

-- DropForeignKey
ALTER TABLE `_OrderToVehicleTemplate` DROP FOREIGN KEY `_OrderToVehicleTemplate_A_fkey`;

-- DropForeignKey
ALTER TABLE `_OrderToVehicleTemplate` DROP FOREIGN KEY `_OrderToVehicleTemplate_B_fkey`;

-- DropForeignKey
ALTER TABLE `_UserToVehicleTemplate` DROP FOREIGN KEY `_UserToVehicleTemplate_A_fkey`;

-- DropForeignKey
ALTER TABLE `_UserToVehicleTemplate` DROP FOREIGN KEY `_UserToVehicleTemplate_B_fkey`;

-- AlterTable
ALTER TABLE `addresses` DROP COLUMN `active`;

-- AlterTable
ALTER TABLE `contacts` DROP COLUMN `active`;

-- AlterTable
ALTER TABLE `order_statuses` DROP COLUMN `active`;

-- AlterTable
ALTER TABLE `orders` ADD COLUMN `user_vehicle_template_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `part_templates` DROP COLUMN `active`;

-- AlterTable
ALTER TABLE `role_templates` DROP COLUMN `active`,
    MODIFY `name` ENUM('ADMIN', 'MANAGER', 'CUSTOMER') NOT NULL DEFAULT 'CUSTOMER';

-- AlterTable
ALTER TABLE `service_steps` DROP COLUMN `active`;

-- AlterTable
ALTER TABLE `service_templates` DROP COLUMN `active`;

-- AlterTable
ALTER TABLE `vehicle_templates` DROP COLUMN `active`;

-- DropTable
DROP TABLE `_OrderToUser`;

-- DropTable
DROP TABLE `_OrderToVehicleTemplate`;

-- DropTable
DROP TABLE `_UserToVehicleTemplate`;

-- CreateTable
CREATE TABLE `users_vehicle_templates` (
    `id` VARCHAR(191) NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `year` INTEGER NOT NULL,
    `color` VARCHAR(191) NOT NULL,
    `complement` VARCHAR(191) NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `vehicle_template_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_user_vehicle_template_id_fkey` FOREIGN KEY (`user_vehicle_template_id`) REFERENCES `users_vehicle_templates`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users_vehicle_templates` ADD CONSTRAINT `users_vehicle_templates_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users_vehicle_templates` ADD CONSTRAINT `users_vehicle_templates_vehicle_template_id_fkey` FOREIGN KEY (`vehicle_template_id`) REFERENCES `vehicle_templates`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
