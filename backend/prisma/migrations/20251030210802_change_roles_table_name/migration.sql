/*
  Warnings:

  - You are about to drop the `roles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users_roles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `users_roles` DROP FOREIGN KEY `users_roles_role_id_fkey`;

-- DropForeignKey
ALTER TABLE `users_roles` DROP FOREIGN KEY `users_roles_user_id_fkey`;

-- DropTable
DROP TABLE `roles`;

-- DropTable
DROP TABLE `users_roles`;

-- CreateTable
CREATE TABLE `role_templates` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `role_templates_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users_role_templates` (
    `user_id` VARCHAR(191) NOT NULL,
    `role_template_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`user_id`, `role_template_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users_role_templates` ADD CONSTRAINT `users_role_templates_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users_role_templates` ADD CONSTRAINT `users_role_templates_role_template_id_fkey` FOREIGN KEY (`role_template_id`) REFERENCES `role_templates`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
