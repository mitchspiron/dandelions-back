/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `article` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `commentaire` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `entreprise` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `evenement` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `reponse` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `utilisateur` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `article` DROP COLUMN `updatedAt`,
    MODIFY `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `commentaire` DROP COLUMN `updatedAt`,
    MODIFY `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `entreprise` DROP COLUMN `updatedAt`,
    MODIFY `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `evenement` DROP COLUMN `updatedAt`,
    MODIFY `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `reponse` DROP COLUMN `updatedAt`,
    MODIFY `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `utilisateur` DROP COLUMN `updatedAt`,
    MODIFY `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE `article` ADD CONSTRAINT `article_ibfk_1` FOREIGN KEY (`idCategorie`) REFERENCES `categorie_article`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `article` ADD CONSTRAINT `article_ibfk_2` FOREIGN KEY (`idRedacteur`) REFERENCES `utilisateur`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `commentaire` ADD CONSTRAINT `commentaire_ibfk_1` FOREIGN KEY (`idUtilisateur`) REFERENCES `utilisateur`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `commentaire` ADD CONSTRAINT `commentaire_ibfk_2` FOREIGN KEY (`idArticle`) REFERENCES `article`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `entreprise` ADD CONSTRAINT `entreprise_ibfk_1` FOREIGN KEY (`idRedacteur`) REFERENCES `utilisateur`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `evenement` ADD CONSTRAINT `evenement_ibfk_1` FOREIGN KEY (`idEntreprise`) REFERENCES `entreprise`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inscription_evenement` ADD CONSTRAINT `inscription_evenement_ibfk_1` FOREIGN KEY (`idEvenement`) REFERENCES `evenement`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inscription_evenement` ADD CONSTRAINT `inscription_evenement_ibfk_2` FOREIGN KEY (`idUtilisateur`) REFERENCES `utilisateur`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reponse` ADD CONSTRAINT `reponse_ibfk_1` FOREIGN KEY (`idUtilisateur`) REFERENCES `utilisateur`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reponse` ADD CONSTRAINT `reponse_ibfk_2` FOREIGN KEY (`idCommentaire`) REFERENCES `commentaire`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `utilisateur` ADD CONSTRAINT `utilisateur_ibfk_1` FOREIGN KEY (`role`) REFERENCES `role_utilisateur`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
