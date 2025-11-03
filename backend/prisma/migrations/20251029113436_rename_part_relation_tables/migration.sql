/*
  Warnings:

  - You are about to drop the `order_parts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `parts_suppliers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `order_parts` DROP FOREIGN KEY `order_parts_order_id_fkey`;

-- DropForeignKey
ALTER TABLE `order_parts` DROP FOREIGN KEY `order_parts_part_template_id_fkey`;

-- DropForeignKey
ALTER TABLE `parts_suppliers` DROP FOREIGN KEY `parts_suppliers_part_template_id_fkey`;

-- DropForeignKey
ALTER TABLE `parts_suppliers` DROP FOREIGN KEY `parts_suppliers_supplier_id_fkey`;

-- DropTable
DROP TABLE `order_parts`;

-- DropTable
DROP TABLE `parts_suppliers`;

-- CreateTable
CREATE TABLE `order_part_templates` (
    `id` VARCHAR(191) NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `order_id` VARCHAR(191) NOT NULL,
    `part_template_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `part_templates_suppliers` (
    `id` VARCHAR(191) NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `part_template_id` VARCHAR(191) NOT NULL,
    `supplier_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `order_part_templates` ADD CONSTRAINT `order_part_templates_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order_part_templates` ADD CONSTRAINT `order_part_templates_part_template_id_fkey` FOREIGN KEY (`part_template_id`) REFERENCES `part_templates`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `part_templates_suppliers` ADD CONSTRAINT `part_templates_suppliers_part_template_id_fkey` FOREIGN KEY (`part_template_id`) REFERENCES `part_templates`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `part_templates_suppliers` ADD CONSTRAINT `part_templates_suppliers_supplier_id_fkey` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
