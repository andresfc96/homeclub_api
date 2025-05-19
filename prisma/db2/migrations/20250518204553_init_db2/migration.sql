-- CreateTable
CREATE TABLE `PropertyInfo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `propertyCode` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `imageUrl` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `PropertyInfo_propertyCode_key`(`propertyCode`),
    INDEX `PropertyInfo_propertyCode_idx`(`propertyCode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
