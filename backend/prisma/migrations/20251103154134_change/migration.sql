/*
  Warnings:

  - The primary key for the `service_steps` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `service_steps` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `service_steps` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`service_template_id`, `step_number`);
