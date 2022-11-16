/*
  Warnings:

  - You are about to drop the column `isPublier` on the `article` table. All the data in the column will be lost.
  - Added the required column `etat` to the `article` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `article` DROP COLUMN `isPublier`,
    ADD COLUMN `etat` INTEGER NOT NULL,
    ADD COLUMN `etat_articleId` INTEGER NULL;

-- CreateTable
CREATE TABLE `etat_article` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nomEtat` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `etat` ON `article`(`etat`);

-- AddForeignKey
ALTER TABLE `article` ADD CONSTRAINT `article_ibfk_1` FOREIGN KEY (`idCategorie`) REFERENCES `categorie_article`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `article` ADD CONSTRAINT `article_ibfk_2` FOREIGN KEY (`idRedacteur`) REFERENCES `utilisateur`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `article` ADD CONSTRAINT `article_ibfk_3` FOREIGN KEY (`etat`) REFERENCES `etat_article`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

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
