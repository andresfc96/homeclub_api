/*
  Warnings:

  - The values [CORPORATE,TOURIST] on the enum `apartment_type` will be removed. If these variants are still used in the database, this will fail.
  - The values [RENT,SERVICE_FEE,BOOKING_FEE] on the enum `payment_concept` will be removed. If these variants are still used in the database, this will fail.
  - You are about to alter the column `status` on the `reservation` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(2))` to `Enum(EnumId(1))`.

*/
-- AlterTable
ALTER TABLE `apartment` MODIFY `type` ENUM('Corporate', 'Tourist') NOT NULL;

-- AlterTable
ALTER TABLE `payment` MODIFY `concept` ENUM('Rent', 'Service_fee', 'Booking_fee') NOT NULL;

-- AlterTable
ALTER TABLE `reservation` MODIFY `status` ENUM('Active', 'Cancelled') NOT NULL DEFAULT 'Active';
