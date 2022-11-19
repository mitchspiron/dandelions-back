/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `categorie_article` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `categorie_article` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `categorie_article` ADD COLUMN `slug` VARCHAR(100) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `slug` ON `categorie_article`(`slug`);

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
