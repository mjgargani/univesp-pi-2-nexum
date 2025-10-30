/*
  Warnings:

  - Added the required column `updated_at` to the `role_templates` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `role_templates` ADD COLUMN `active` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `complement` VARCHAR(191) NULL,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL;
