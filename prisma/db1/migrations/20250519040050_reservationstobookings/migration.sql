/*
  Warnings:

  - You are about to drop the column `reservationId` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the `reservation` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `bookingId` to the `payment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `payment` DROP FOREIGN KEY `payment_reservationId_fkey`;

-- DropForeignKey
ALTER TABLE `reservation` DROP FOREIGN KEY `reservation_apartmentId_fkey`;

-- DropForeignKey
ALTER TABLE `reservation` DROP FOREIGN KEY `reservation_clientId_fkey`;

-- DropForeignKey
ALTER TABLE `reservation` DROP FOREIGN KEY `reservation_corporateRateId_fkey`;

-- DropForeignKey
ALTER TABLE `reservation` DROP FOREIGN KEY `reservation_touristRateId_fkey`;

-- DropIndex
DROP INDEX `payment_reservationId_idx` ON `payment`;

-- AlterTable
ALTER TABLE `payment` DROP COLUMN `reservationId`,
    ADD COLUMN `bookingId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `reservation`;

-- CreateTable
CREATE TABLE `booking` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(191) NOT NULL,
    `apartmentId` INTEGER NOT NULL,
    `clientId` INTEGER NOT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,
    `status` ENUM('Active', 'Cancelled') NOT NULL DEFAULT 'Active',
    `corporateRateId` INTEGER NULL,
    `touristRateId` INTEGER NULL,

    UNIQUE INDEX `booking_code_key`(`code`),
    INDEX `booking_apartmentId_idx`(`apartmentId`),
    INDEX `booking_clientId_idx`(`clientId`),
    INDEX `booking_code_idx`(`code`),
    INDEX `booking_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `payment_bookingId_idx` ON `payment`(`bookingId`);

-- AddForeignKey
ALTER TABLE `booking` ADD CONSTRAINT `booking_apartmentId_fkey` FOREIGN KEY (`apartmentId`) REFERENCES `apartment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `booking` ADD CONSTRAINT `booking_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `client`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `booking` ADD CONSTRAINT `booking_corporateRateId_fkey` FOREIGN KEY (`corporateRateId`) REFERENCES `corporateRate`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `booking` ADD CONSTRAINT `booking_touristRateId_fkey` FOREIGN KEY (`touristRateId`) REFERENCES `touristRate`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payment` ADD CONSTRAINT `payment_bookingId_fkey` FOREIGN KEY (`bookingId`) REFERENCES `booking`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
