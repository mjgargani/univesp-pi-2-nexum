-- CreateTable
CREATE TABLE `order_counter` (
    `id` INTEGER NOT NULL DEFAULT 1,
    `lastOrder` INTEGER NOT NULL DEFAULT 1000,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
