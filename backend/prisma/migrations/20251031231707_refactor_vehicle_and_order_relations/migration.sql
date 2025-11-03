/*
  Warnings:

  - You are about to drop the column `name` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `vehicle_id` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the `vehicles` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[number]` on the table `orders` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `number` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_vehicle_template_id` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `orders` DROP FOREIGN KEY `orders_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `orders` DROP FOREIGN KEY `orders_vehicle_id_fkey`;

-- DropForeignKey
ALTER TABLE `vehicles` DROP FOREIGN KEY `vehicles_manufacturer_id_fkey`;

-- DropIndex
DROP INDEX `orders_user_id_fkey` ON `orders`;

-- DropIndex
DROP INDEX `orders_vehicle_id_fkey` ON `orders`;

-- AlterTable
ALTER TABLE `orders` DROP COLUMN `name`,
    DROP COLUMN `user_id`,
    DROP COLUMN `vehicle_id`,
    ADD COLUMN `number` INTEGER NOT NULL,
    ADD COLUMN `user_vehicle_template_id` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `vehicles`;

-- CreateTable
CREATE TABLE `vehicle_templates` (
    `id` VARCHAR(191) NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `complement` VARCHAR(191) NULL,
    `manufacturer_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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

-- CreateIndex
CREATE UNIQUE INDEX `orders_number_key` ON `orders`(`number`);

-- AddForeignKey
ALTER TABLE `vehicle_templates` ADD CONSTRAINT `vehicle_templates_manufacturer_id_fkey` FOREIGN KEY (`manufacturer_id`) REFERENCES `manufacturers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_user_vehicle_template_id_fkey` FOREIGN KEY (`user_vehicle_template_id`) REFERENCES `users_vehicle_templates`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users_vehicle_templates` ADD CONSTRAINT `users_vehicle_templates_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users_vehicle_templates` ADD CONSTRAINT `users_vehicle_templates_vehicle_template_id_fkey` FOREIGN KEY (`vehicle_template_id`) REFERENCES `vehicle_templates`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
