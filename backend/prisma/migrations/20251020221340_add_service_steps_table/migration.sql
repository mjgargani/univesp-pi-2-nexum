-- CreateTable
CREATE TABLE `service_steps` (
    `id` VARCHAR(191) NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `step_number` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `complement` VARCHAR(191) NULL,
    `service_template_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `service_steps` ADD CONSTRAINT `service_steps_service_template_id_fkey` FOREIGN KEY (`service_template_id`) REFERENCES `service_templates`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
