"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvenementService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const fs = require("fs");
let EvenementService = class EvenementService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createEvenement(dto) {
        var _a, _b;
        const entrepriseById = await this.prisma.entreprise.findUnique({
            where: {
                id: dto.idEntreprise,
            },
            include: {
                utilisateur: {
                    select: {
                        id: true,
                        role_utilisateur: {
                            select: {
                                id: true,
                            },
                        },
                    },
                },
            },
        });
        const redacteurExist = [1, 2].includes((_b = (_a = entrepriseById === null || entrepriseById === void 0 ? void 0 : entrepriseById.utilisateur) === null || _a === void 0 ? void 0 : _a.role_utilisateur) === null || _b === void 0 ? void 0 : _b.id);
        if (!redacteurExist) {
            throw new common_1.ForbiddenException("Le redacteur de l'entreprise sélectionné n'éxiste pas");
        }
        const slug = dto.titre
            .toLocaleLowerCase()
            .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')
            .trim()
            .split(' ')
            .join('-');
        const evenementBySlug = await this.prisma.article.findUnique({
            where: {
                slug,
            },
        });
        if (evenementBySlug) {
            throw new common_1.ForbiddenException('Cet evenement existe déja');
        }
        return this.prisma.evenement.create({
            data: {
                idEntreprise: dto.idEntreprise,
                titre: dto.titre,
                slug,
                description: dto.description,
                illustration: dto.illustration,
                contenu: dto.contenu,
                deadline: new Date(dto.deadline),
                onHeader: false,
                onSubscribe: dto.onSubscribe,
            },
        });
    }
    async getEvenement() {
        const evenement = await this.prisma.evenement.findMany({
            orderBy: {
                id: 'desc',
            },
            select: {
                id: true,
                entreprise: {
                    select: {
                        id: true,
                        nom: true,
                        illustration: true,
                        slug: true,
                        descriptionA: true,
                    },
                },
                titre: true,
                slug: true,
                illustration: true,
                description: true,
                contenu: true,
                deadline: true,
                onHeader: true,
                createdAt: true,
                onSubscribe: true,
                inscription_evenement: {
                    select: {
                        id: true,
                        idUtilisateur: true,
                    },
                },
            },
        });
        if (!evenement) {
            throw new common_1.ForbiddenException("Il n'y a aucun évenement!");
        }
        return evenement;
    }
    async getEvenementOnHeader() {
        const evenement = await this.prisma.evenement.findMany({
            orderBy: {
                id: 'desc',
            },
            where: {
                onHeader: true,
            },
            select: {
                id: true,
                entreprise: {
                    select: {
                        id: true,
                        nom: true,
                        illustration: true,
                        slug: true,
                        descriptionA: true,
                    },
                },
                titre: true,
                slug: true,
                illustration: true,
                description: true,
                contenu: true,
                deadline: true,
                onHeader: true,
                createdAt: true,
                onSubscribe: true,
                inscription_evenement: {
                    select: {
                        id: true,
                        idUtilisateur: true,
                    },
                },
            },
        });
        if (!evenement) {
            throw new common_1.ForbiddenException("Il n'y a aucun évenement!");
        }
        return evenement;
    }
    async filterEvenement(dto) {
        const evenement = await this.prisma.evenement.findMany({
            orderBy: {
                id: 'desc',
            },
            where: {
                OR: [
                    {
                        titre: {
                            contains: dto.searchkey,
                        },
                    },
                    {
                        description: {
                            contains: dto.searchkey,
                        },
                    },
                    {
                        contenu: {
                            contains: dto.searchkey,
                        },
                    },
                ],
            },
            select: {
                id: true,
                entreprise: {
                    select: {
                        id: true,
                        nom: true,
                        illustration: true,
                        slug: true,
                        descriptionA: true,
                    },
                },
                titre: true,
                slug: true,
                illustration: true,
                description: true,
                contenu: true,
                deadline: true,
                onHeader: true,
                createdAt: true,
                onSubscribe: true,
                inscription_evenement: {
                    select: {
                        id: true,
                        idUtilisateur: true,
                    },
                },
            },
        });
        if (!evenement) {
            throw new common_1.ForbiddenException("Il n'y a aucun évenement!");
        }
        return evenement;
    }
    async getFourLastEvenement() {
        const evenement = await this.prisma.evenement.findMany({
            orderBy: {
                id: 'desc',
            },
            take: 4,
            select: {
                id: true,
                entreprise: {
                    select: {
                        id: true,
                        nom: true,
                        illustration: true,
                        slug: true,
                        descriptionA: true,
                    },
                },
                titre: true,
                slug: true,
                illustration: true,
                description: true,
                contenu: true,
                deadline: true,
                onHeader: true,
                createdAt: true,
                onSubscribe: true,
                inscription_evenement: {
                    select: {
                        id: true,
                        idUtilisateur: true,
                    },
                },
            },
        });
        if (!evenement) {
            throw new common_1.ForbiddenException("Il n'y a aucun évenement!");
        }
        return evenement;
    }
    async getEvenementAdmin(id) {
        const user = await this.prisma.utilisateur.findUnique({
            where: {
                id: Number(id),
            },
        });
        if (!user) {
            throw new common_1.ForbiddenException("L'utilisateur sélectionné n'éxiste pas");
        }
        else if (user.role !== 1) {
            const evenement = await this.prisma.evenement.findMany({
                orderBy: {
                    id: 'desc',
                },
                where: {
                    entreprise: {
                        utilisateur: {
                            id: Number(id),
                        },
                    },
                },
                select: {
                    id: true,
                    entreprise: {
                        select: {
                            id: true,
                            nom: true,
                            illustration: true,
                            slug: true,
                            descriptionA: true,
                        },
                    },
                    titre: true,
                    slug: true,
                    illustration: true,
                    description: true,
                    contenu: true,
                    deadline: true,
                    onHeader: true,
                    createdAt: true,
                    onSubscribe: true,
                    inscription_evenement: {
                        select: {
                            id: true,
                            idUtilisateur: true,
                        },
                    },
                },
            });
            if (!evenement) {
                throw new common_1.ForbiddenException("Il n'y a aucun évenement!");
            }
            return evenement;
        }
        const evenement = await this.prisma.evenement.findMany({
            orderBy: {
                id: 'desc',
            },
            select: {
                id: true,
                entreprise: {
                    select: {
                        id: true,
                        nom: true,
                        illustration: true,
                        slug: true,
                        descriptionA: true,
                    },
                },
                titre: true,
                slug: true,
                illustration: true,
                description: true,
                contenu: true,
                deadline: true,
                onHeader: true,
                createdAt: true,
                onSubscribe: true,
                inscription_evenement: {
                    select: {
                        id: true,
                        idUtilisateur: true,
                    },
                },
            },
        });
        if (!evenement) {
            throw new common_1.ForbiddenException("Il n'y a aucun évenement!");
        }
        return evenement;
    }
    async filterEvenementAdmin(id, dto) {
        const user = await this.prisma.utilisateur.findUnique({
            where: {
                id: Number(id),
            },
        });
        if (!user) {
            throw new common_1.ForbiddenException("L'utilisateur sélectionné n'éxiste pas");
        }
        else if (user.role !== 1) {
            const evenement = await this.prisma.evenement.findMany({
                orderBy: {
                    id: 'desc',
                },
                where: {
                    entreprise: {
                        utilisateur: {
                            id: Number(id),
                        },
                    },
                    titre: {
                        contains: dto.searchkey,
                    },
                },
                select: {
                    id: true,
                    entreprise: {
                        select: {
                            id: true,
                            nom: true,
                            illustration: true,
                            slug: true,
                            descriptionA: true,
                        },
                    },
                    titre: true,
                    slug: true,
                    illustration: true,
                    description: true,
                    contenu: true,
                    deadline: true,
                    onHeader: true,
                    createdAt: true,
                    onSubscribe: true,
                    inscription_evenement: {
                        select: {
                            id: true,
                            idUtilisateur: true,
                        },
                    },
                },
            });
            if (!evenement) {
                throw new common_1.ForbiddenException("Il n'y a aucun évenement!");
            }
            return evenement;
        }
        const evenement = await this.prisma.evenement.findMany({
            orderBy: {
                id: 'desc',
            },
            where: {
                titre: {
                    contains: dto.searchkey,
                },
            },
            select: {
                id: true,
                entreprise: {
                    select: {
                        id: true,
                        nom: true,
                        illustration: true,
                        slug: true,
                        descriptionA: true,
                    },
                },
                titre: true,
                slug: true,
                illustration: true,
                description: true,
                contenu: true,
                deadline: true,
                onHeader: true,
                createdAt: true,
                onSubscribe: true,
                inscription_evenement: {
                    select: {
                        id: true,
                        idUtilisateur: true,
                    },
                },
            },
        });
        if (!evenement) {
            throw new common_1.ForbiddenException("Il n'y a aucun évenement!");
        }
        return evenement;
    }
    async getEvenementBySlug(slug) {
        const evenementBySlug = await this.prisma.evenement.findUnique({
            where: {
                slug,
            },
            select: {
                id: true,
                entreprise: {
                    select: {
                        id: true,
                        nom: true,
                        illustration: true,
                        slug: true,
                        descriptionA: true,
                    },
                },
                titre: true,
                slug: true,
                illustration: true,
                description: true,
                contenu: true,
                deadline: true,
                onHeader: true,
                createdAt: true,
                onSubscribe: true,
                inscription_evenement: {
                    select: {
                        id: true,
                        idUtilisateur: true,
                    },
                },
            },
        });
        if (!evenementBySlug) {
            throw new common_1.ForbiddenException("Cet evenement n'existe pas!");
        }
        return evenementBySlug;
    }
    async updateEvenementBySlug(slug, id, dto) {
        var _a;
        const evenementExists = await this.prisma.evenement.findUnique({
            where: {
                slug,
            },
            include: {
                entreprise: {
                    include: {
                        utilisateur: true,
                    },
                },
            },
        });
        if (!evenementExists) {
            throw new common_1.ForbiddenException("Cet evenement n'existe pas!");
        }
        else {
            const updatedSlug = dto.titre
                .toLocaleLowerCase()
                .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')
                .trim()
                .split(' ')
                .join('-');
            const titreEvenementExist = await this.prisma.evenement.findUnique({
                where: {
                    slug: updatedSlug,
                },
            });
            if (titreEvenementExist && slug !== updatedSlug) {
                throw new common_1.ForbiddenException("Ce titre d'évenement existe déja!");
            }
            const redacteur = await this.prisma.utilisateur.findUnique({
                where: {
                    id,
                },
                include: {
                    role_utilisateur: {
                        select: {
                            id: true,
                        },
                    },
                },
            });
            if (evenementExists.entreprise.utilisateur.id !== id &&
                ((_a = redacteur === null || redacteur === void 0 ? void 0 : redacteur.role_utilisateur) === null || _a === void 0 ? void 0 : _a.id) !== 1) {
                throw new common_1.ForbiddenException("Cet évènement n'est pas le votre!");
            }
            return await this.prisma.evenement.update({
                data: {
                    titre: dto.titre,
                    description: dto.description,
                    contenu: dto.contenu,
                    deadline: new Date(dto.deadline),
                    slug: updatedSlug,
                    onSubscribe: dto.onSubscribe,
                },
                where: {
                    slug,
                },
            });
        }
    }
    async updateIllustrationBySlug(slug, id, dto) {
        var _a;
        const evenementBySlug = await this.prisma.evenement.findUnique({
            where: {
                slug,
            },
            include: {
                entreprise: {
                    include: {
                        utilisateur: true,
                    },
                },
            },
        });
        if (!evenementBySlug) {
            throw new common_1.ForbiddenException("Cet illustration d'evenement n'existe pas!");
        }
        if (fs.existsSync(`./images/${evenementBySlug.illustration}`)) {
            fs.unlinkSync(`./images/${evenementBySlug.illustration}`);
        }
        const redacteur = await this.prisma.utilisateur.findUnique({
            where: {
                id,
            },
            include: {
                role_utilisateur: {
                    select: {
                        id: true,
                    },
                },
            },
        });
        if (evenementBySlug.entreprise.idRedacteur !== id &&
            ((_a = redacteur === null || redacteur === void 0 ? void 0 : redacteur.role_utilisateur) === null || _a === void 0 ? void 0 : _a.id) !== 1) {
            throw new common_1.ForbiddenException("Cet évènement n'est pas le votre!");
        }
        return await this.prisma.evenement.update({
            data: {
                illustration: dto.illustration,
            },
            where: {
                slug,
            },
        });
    }
    async deleteEvenementBySlug(slug, id) {
        var _a;
        const evenementBySlug = await this.prisma.evenement.findUnique({
            where: {
                slug,
            },
            include: {
                entreprise: {
                    include: {
                        utilisateur: true,
                    },
                },
            },
        });
        if (!evenementBySlug) {
            throw new common_1.ForbiddenException("Cet evenement n'existe pas!");
        }
        if (fs.existsSync(`./images/${evenementBySlug.illustration}`)) {
            fs.unlinkSync(`./images/${evenementBySlug.illustration}`);
        }
        const redacteur = await this.prisma.utilisateur.findUnique({
            where: {
                id,
            },
            include: {
                role_utilisateur: {
                    select: {
                        id: true,
                    },
                },
            },
        });
        if (evenementBySlug.entreprise.idRedacteur !== id &&
            ((_a = redacteur === null || redacteur === void 0 ? void 0 : redacteur.role_utilisateur) === null || _a === void 0 ? void 0 : _a.id) !== 1) {
            throw new common_1.ForbiddenException("Cet évènement n'est pas le votre!");
        }
        return await this.prisma.evenement.delete({
            where: {
                slug,
            },
        });
    }
    async switchOnHeaderBySlug(slug, dto) {
        const eventBySlug = await this.prisma.evenement.findUnique({
            where: {
                slug,
            },
        });
        if (!eventBySlug) {
            throw new common_1.ForbiddenException("Cet évenement n'existe pas!");
        }
        return await this.prisma.evenement.update({
            data: {
                onHeader: dto.onHeader,
            },
            where: {
                slug,
            },
            select: {
                id: true,
                onHeader: true,
            },
        });
    }
    async switchOnSubscribeBySlug(slug, dto) {
        const eventBySlug = await this.prisma.evenement.findUnique({
            where: {
                slug,
            },
        });
        if (!eventBySlug) {
            throw new common_1.ForbiddenException("Cet évenement n'existe pas!");
        }
        return await this.prisma.evenement.update({
            data: {
                onSubscribe: dto.onSubscribe,
            },
            where: {
                slug,
            },
            select: {
                id: true,
                onSubscribe: true,
            },
        });
    }
};
EvenementService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EvenementService);
exports.EvenementService = EvenementService;
//# sourceMappingURL=evenement.service.js.map