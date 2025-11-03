-- DropForeignKey
ALTER TABLE `order_part_templates` DROP FOREIGN KEY `order_part_templates_order_id_fkey`;

-- DropForeignKey
ALTER TABLE `order_part_templates` DROP FOREIGN KEY `order_part_templates_part_template_id_fkey`;

-- DropForeignKey
ALTER TABLE `order_service_templates` DROP FOREIGN KEY `order_service_templates_order_id_fkey`;

-- DropForeignKey
ALTER TABLE `order_service_templates` DROP FOREIGN KEY `order_service_templates_service_template_id_fkey`;

-- DropForeignKey
ALTER TABLE `order_statuses` DROP FOREIGN KEY `order_statuses_order_id_fkey`;

-- DropForeignKey
ALTER TABLE `orders` DROP FOREIGN KEY `orders_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `orders` DROP FOREIGN KEY `orders_vehicle_id_fkey`;

-- DropForeignKey
ALTER TABLE `part_templates_suppliers` DROP FOREIGN KEY `part_templates_suppliers_part_template_id_fkey`;

-- DropForeignKey
ALTER TABLE `part_templates_suppliers` DROP FOREIGN KEY `part_templates_suppliers_supplier_id_fkey`;

-- DropForeignKey
ALTER TABLE `service_steps` DROP FOREIGN KEY `service_steps_service_template_id_fkey`;

-- DropForeignKey
ALTER TABLE `suppliers_addresses` DROP FOREIGN KEY `suppliers_addresses_address_id_fkey`;

-- DropForeignKey
ALTER TABLE `suppliers_addresses` DROP FOREIGN KEY `suppliers_addresses_supplier_id_fkey`;

-- DropForeignKey
ALTER TABLE `suppliers_contacts` DROP FOREIGN KEY `suppliers_contacts_contact_id_fkey`;

-- DropForeignKey
ALTER TABLE `suppliers_contacts` DROP FOREIGN KEY `suppliers_contacts_supplier_id_fkey`;

-- DropForeignKey
ALTER TABLE `users_addresses` DROP FOREIGN KEY `users_addresses_address_id_fkey`;

-- DropForeignKey
ALTER TABLE `users_addresses` DROP FOREIGN KEY `users_addresses_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `users_contacts` DROP FOREIGN KEY `users_contacts_contact_id_fkey`;

-- DropForeignKey
ALTER TABLE `users_contacts` DROP FOREIGN KEY `users_contacts_user_id_fkey`;

-- DropIndex
DROP INDEX `order_part_templates_order_id_fkey` ON `order_part_templates`;

-- DropIndex
DROP INDEX `order_part_templates_part_template_id_fkey` ON `order_part_templates`;

-- DropIndex
DROP INDEX `order_service_templates_order_id_fkey` ON `order_service_templates`;

-- DropIndex
DROP INDEX `order_service_templates_service_template_id_fkey` ON `order_service_templates`;

-- DropIndex
DROP INDEX `order_statuses_order_id_fkey` ON `order_statuses`;

-- DropIndex
DROP INDEX `orders_user_id_fkey` ON `orders`;

-- DropIndex
DROP INDEX `orders_vehicle_id_fkey` ON `orders`;

-- DropIndex
DROP INDEX `part_templates_suppliers_part_template_id_fkey` ON `part_templates_suppliers`;

-- DropIndex
DROP INDEX `part_templates_suppliers_supplier_id_fkey` ON `part_templates_suppliers`;

-- DropIndex
DROP INDEX `service_steps_service_template_id_fkey` ON `service_steps`;

-- DropIndex
DROP INDEX `suppliers_addresses_address_id_fkey` ON `suppliers_addresses`;

-- DropIndex
DROP INDEX `suppliers_addresses_supplier_id_fkey` ON `suppliers_addresses`;

-- DropIndex
DROP INDEX `suppliers_contacts_contact_id_fkey` ON `suppliers_contacts`;

-- DropIndex
DROP INDEX `suppliers_contacts_supplier_id_fkey` ON `suppliers_contacts`;

-- DropIndex
DROP INDEX `users_addresses_address_id_fkey` ON `users_addresses`;

-- DropIndex
DROP INDEX `users_addresses_user_id_fkey` ON `users_addresses`;

-- DropIndex
DROP INDEX `users_contacts_contact_id_fkey` ON `users_contacts`;

-- DropIndex
DROP INDEX `users_contacts_user_id_fkey` ON `users_contacts`;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_vehicle_id_fkey` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `service_steps` ADD CONSTRAINT `service_steps_service_template_id_fkey` FOREIGN KEY (`service_template_id`) REFERENCES `service_templates`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order_statuses` ADD CONSTRAINT `order_statuses_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order_service_templates` ADD CONSTRAINT `order_service_templates_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order_service_templates` ADD CONSTRAINT `order_service_templates_service_template_id_fkey` FOREIGN KEY (`service_template_id`) REFERENCES `service_templates`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order_part_templates` ADD CONSTRAINT `order_part_templates_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order_part_templates` ADD CONSTRAINT `order_part_templates_part_template_id_fkey` FOREIGN KEY (`part_template_id`) REFERENCES `part_templates`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users_contacts` ADD CONSTRAINT `users_contacts_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users_contacts` ADD CONSTRAINT `users_contacts_contact_id_fkey` FOREIGN KEY (`contact_id`) REFERENCES `contacts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users_addresses` ADD CONSTRAINT `users_addresses_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users_addresses` ADD CONSTRAINT `users_addresses_address_id_fkey` FOREIGN KEY (`address_id`) REFERENCES `addresses`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `suppliers_contacts` ADD CONSTRAINT `suppliers_contacts_supplier_id_fkey` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `suppliers_contacts` ADD CONSTRAINT `suppliers_contacts_contact_id_fkey` FOREIGN KEY (`contact_id`) REFERENCES `contacts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `suppliers_addresses` ADD CONSTRAINT `suppliers_addresses_supplier_id_fkey` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `suppliers_addresses` ADD CONSTRAINT `suppliers_addresses_address_id_fkey` FOREIGN KEY (`address_id`) REFERENCES `addresses`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `part_templates_suppliers` ADD CONSTRAINT `part_templates_suppliers_part_template_id_fkey` FOREIGN KEY (`part_template_id`) REFERENCES `part_templates`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `part_templates_suppliers` ADD CONSTRAINT `part_templates_suppliers_supplier_id_fkey` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
