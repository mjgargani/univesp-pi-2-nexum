/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `manufacturers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `part_templates` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `service_templates` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[company_name]` on the table `suppliers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `vehicle_templates` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `manufacturers_name_key` ON `manufacturers`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `part_templates_name_key` ON `part_templates`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `service_templates_name_key` ON `service_templates`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `suppliers_company_name_key` ON `suppliers`(`company_name`);

-- CreateIndex
CREATE UNIQUE INDEX `vehicle_templates_name_key` ON `vehicle_templates`(`name`);
