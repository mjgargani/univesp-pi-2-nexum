/*
  Warnings:

  - You are about to drop the `order_services` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `order_services` DROP FOREIGN KEY `order_services_order_id_fkey`;

-- DropForeignKey
ALTER TABLE `order_services` DROP FOREIGN KEY `order_services_service_template_id_fkey`;

-- DropTable
DROP TABLE `order_services`;

-- CreateTable
CREATE TABLE `order_service_templates` (
    `id` VARCHAR(191) NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `order_id` VARCHAR(191) NOT NULL,
    `service_template_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `order_service_templates` ADD CONSTRAINT `order_service_templates_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order_service_templates` ADD CONSTRAINT `order_service_templates_service_template_id_fkey` FOREIGN KEY (`service_template_id`) REFERENCES `service_templates`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
