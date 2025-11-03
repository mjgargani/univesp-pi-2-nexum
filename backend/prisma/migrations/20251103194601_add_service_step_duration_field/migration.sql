/*
  Warnings:

  - Added the required column `estimated_duration` to the `service_steps` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `service_steps` ADD COLUMN `estimated_duration` INTEGER NOT NULL;
