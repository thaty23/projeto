-- CreateTable
CREATE TABLE `Medicamentos` (
    `id` VARCHAR(191) NOT NULL,
    `postoId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `data` VARCHAR(191) NOT NULL,
    `quantidade` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Medicamentos` ADD CONSTRAINT `Medicamentos_postoId_fkey` FOREIGN KEY (`postoId`) REFERENCES `Posto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
