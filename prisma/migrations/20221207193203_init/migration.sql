/*
  Warnings:

  - Added the required column `updatedAt` to the `article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vu` to the `article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vu` to the `commentaire` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vu` to the `reponse` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `article` ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    ADD COLUMN `vu` BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE `commentaire` ADD COLUMN `vu` BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE `reponse` ADD COLUMN `vu` BOOLEAN NOT NULL;
