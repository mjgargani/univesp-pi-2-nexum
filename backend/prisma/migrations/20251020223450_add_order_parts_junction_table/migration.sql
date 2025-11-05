-- CreateTable
CREATE TABLE `order_parts` (
    `id` VARCHAR(191) NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `order_id` VARCHAR(191) NOT NULL,
    `part_template_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `order_parts` ADD CONSTRAINT `order_parts_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order_parts` ADD CONSTRAINT `order_parts_part_template_id_fkey` FOREIGN KEY (`part_template_id`) REFERENCES `part_templates`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
