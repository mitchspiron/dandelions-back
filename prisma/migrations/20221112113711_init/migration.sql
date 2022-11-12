-- CreateTable
CREATE TABLE `article` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idRedacteur` INTEGER NOT NULL,
    `idCategorie` INTEGER NOT NULL,
    `titre` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(100) NOT NULL,
    `illustration` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `contenu` LONGTEXT NOT NULL,
    `top` BOOLEAN NOT NULL,
    `recommadee` BOOLEAN NOT NULL,
    `isPublier` BOOLEAN NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `slug`(`slug`),
    INDEX `idCategorie`(`idCategorie`),
    INDEX `idRedacteur`(`idRedacteur`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categorie_article` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nomCategorie` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `commentaire` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idUtilisateur` INTEGER NOT NULL,
    `idArticle` INTEGER NOT NULL,
    `contenu` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `idArticle`(`idArticle`),
    INDEX `idUtilisateur`(`idUtilisateur`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `entreprise` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idRedacteur` INTEGER NOT NULL,
    `illustration` VARCHAR(255) NOT NULL,
    `nom` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(100) NOT NULL,
    `brand` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `telephone` VARCHAR(255) NOT NULL,
    `anneeCreation` VARCHAR(10) NOT NULL,
    `urlWebsite` VARCHAR(255) NOT NULL,
    `descriptionA` TEXT NOT NULL,
    `descriptionB` TEXT NOT NULL,
    `textContact` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `slug`(`slug`),
    INDEX `idRedacteur`(`idRedacteur`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `evenement` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idEntreprise` INTEGER NOT NULL,
    `titre` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(100) NOT NULL,
    `illustration` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `contenu` LONGTEXT NOT NULL,
    `deadline` TIMESTAMP(0) NOT NULL,
    `onHeader` BOOLEAN NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `slug`(`slug`),
    INDEX `idEntreprise`(`idEntreprise`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `inscription_evenement` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idEvenement` INTEGER NOT NULL,
    `idUtilisateur` INTEGER NOT NULL,

    INDEX `idEvenement`(`idEvenement`),
    INDEX `idUtilisateur`(`idUtilisateur`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reponse` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idUtilisateur` INTEGER NOT NULL,
    `idCommentaire` INTEGER NOT NULL,
    `contenu` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `idCommentaire`(`idCommentaire`),
    INDEX `idUtilisateur`(`idUtilisateur`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `role_utilisateur` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nomRole` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `utilisateur` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(255) NOT NULL,
    `prenom` VARCHAR(255) NOT NULL,
    `illustration` VARCHAR(255) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `telephone` VARCHAR(50) NOT NULL,
    `aPropos` TEXT NOT NULL,
    `role` INTEGER NOT NULL,
    `motDePasse` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `email`(`email`),
    INDEX `role`(`role`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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
