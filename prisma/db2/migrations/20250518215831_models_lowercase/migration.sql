/*
  Warnings:

  - You are about to drop the `PropertyInfo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `PropertyInfo`;

-- CreateTable
CREATE TABLE `propertyInfo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `propertyCode` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `imageUrl` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `propertyInfo_propertyCode_key`(`propertyCode`),
    INDEX `propertyInfo_propertyCode_idx`(`propertyCode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
