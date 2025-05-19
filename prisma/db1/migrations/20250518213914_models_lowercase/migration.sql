/*
  Warnings:

  - You are about to drop the `Apartment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Client` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CorporateRate` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Payment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Reservation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TouristRate` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `CorporateRate` DROP FOREIGN KEY `CorporateRate_apartmentId_fkey`;

-- DropForeignKey
ALTER TABLE `Payment` DROP FOREIGN KEY `Payment_reservationId_fkey`;

-- DropForeignKey
ALTER TABLE `Reservation` DROP FOREIGN KEY `Reservation_apartmentId_fkey`;

-- DropForeignKey
ALTER TABLE `Reservation` DROP FOREIGN KEY `Reservation_clientId_fkey`;

-- DropForeignKey
ALTER TABLE `Reservation` DROP FOREIGN KEY `Reservation_corporateRateId_fkey`;

-- DropForeignKey
ALTER TABLE `Reservation` DROP FOREIGN KEY `Reservation_touristRateId_fkey`;

-- DropForeignKey
ALTER TABLE `TouristRate` DROP FOREIGN KEY `TouristRate_apartmentId_fkey`;

-- DropTable
DROP TABLE `Apartment`;

-- DropTable
DROP TABLE `Client`;

-- DropTable
DROP TABLE `CorporateRate`;

-- DropTable
DROP TABLE `Payment`;

-- DropTable
DROP TABLE `Reservation`;

-- DropTable
DROP TABLE `TouristRate`;

-- CreateTable
CREATE TABLE `apartment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `type` ENUM('CORPORATE', 'TOURIST') NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `latitude` DOUBLE NOT NULL,
    `longitude` DOUBLE NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,

    INDEX `apartment_type_idx`(`type`),
    INDEX `apartment_city_idx`(`city`),
    INDEX `apartment_country_idx`(`country`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `corporateRate` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `apartmentId` INTEGER NOT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,
    `monthlyRate` DOUBLE NOT NULL,

    INDEX `corporateRate_apartmentId_idx`(`apartmentId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `touristRate` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `apartmentId` INTEGER NOT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,
    `dailyRate` DOUBLE NOT NULL,

    INDEX `touristRate_apartmentId_idx`(`apartmentId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `client` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `client_email_key`(`email`),
    INDEX `client_email_idx`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reservation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(191) NOT NULL,
    `apartmentId` INTEGER NOT NULL,
    `clientId` INTEGER NOT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,
    `status` ENUM('ACTIVE', 'CANCELLED') NOT NULL DEFAULT 'ACTIVE',
    `corporateRateId` INTEGER NULL,
    `touristRateId` INTEGER NULL,

    UNIQUE INDEX `reservation_code_key`(`code`),
    INDEX `reservation_apartmentId_idx`(`apartmentId`),
    INDEX `reservation_clientId_idx`(`clientId`),
    INDEX `reservation_code_idx`(`code`),
    INDEX `reservation_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `reservationId` INTEGER NOT NULL,
    `concept` ENUM('RENT', 'SERVICE_FEE', 'BOOKING_FEE') NOT NULL,
    `amount` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `payment_reservationId_idx`(`reservationId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `corporateRate` ADD CONSTRAINT `corporateRate_apartmentId_fkey` FOREIGN KEY (`apartmentId`) REFERENCES `apartment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `touristRate` ADD CONSTRAINT `touristRate_apartmentId_fkey` FOREIGN KEY (`apartmentId`) REFERENCES `apartment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reservation` ADD CONSTRAINT `reservation_apartmentId_fkey` FOREIGN KEY (`apartmentId`) REFERENCES `apartment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reservation` ADD CONSTRAINT `reservation_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `client`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reservation` ADD CONSTRAINT `reservation_corporateRateId_fkey` FOREIGN KEY (`corporateRateId`) REFERENCES `corporateRate`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reservation` ADD CONSTRAINT `reservation_touristRateId_fkey` FOREIGN KEY (`touristRateId`) REFERENCES `touristRate`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payment` ADD CONSTRAINT `payment_reservationId_fkey` FOREIGN KEY (`reservationId`) REFERENCES `reservation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
