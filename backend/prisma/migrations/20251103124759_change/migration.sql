/*
  Warnings:

  - You are about to drop the column `description` on the `manufacturers` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `order_statuses` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `service_steps` table. All the data in the column will be lost.
  - Added the required column `name` to the `order_statuses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `manufacturers` DROP COLUMN `description`;

-- AlterTable
ALTER TABLE `order_statuses` DROP COLUMN `description`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `service_steps` DROP COLUMN `description`;
