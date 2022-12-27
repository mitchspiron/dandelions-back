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
exports.EnterpriseService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const fs = require("fs");
let EnterpriseService = class EnterpriseService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createEnterprise(dto) {
        var _a;
        const redacteur = await this.prisma.utilisateur.findUnique({
            where: {
                id: dto.idRedacteur,
            },
            include: {
                role_utilisateur: {
                    select: {
                        id: true,
                    },
                },
            },
        });
        const redacteurExists = [1, 2].includes((_a = redacteur === null || redacteur === void 0 ? void 0 : redacteur.role_utilisateur) === null || _a === void 0 ? void 0 : _a.id);
        if (!redacteurExists) {
            throw new common_1.ForbiddenException("Le redacteur sélectionné n'éxiste pas");
        }
        const slug = dto.nom
            .toLocaleLowerCase()
            .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')
            .trim()
            .split(' ')
            .join('-');
        const slugExists = await this.prisma.article.findUnique({
            where: {
                slug,
            },
        });
        if (slugExists) {
            throw new common_1.ForbiddenException('Cet entreprise existe déjà!');
        }
        return await this.prisma.entreprise.create({
            data: {
                idRedacteur: dto.idRedacteur,
                illustration: dto.illustration,
                nom: dto.nom,
                slug,
                brand: dto.brand,
                email: dto.email,
                telephone: dto.telephone,
                anneeCreation: dto.anneeCreation,
                urlWebsite: dto.urlWebsite,
                descriptionA: dto.descriptionA,
                descriptionB: dto.descriptionB,
                textContact: dto.textContact,
                abonnee: false,
            },
        });
    }
    async getEnterprise() {
        const enterprises = await this.prisma.entreprise.findMany({
            orderBy: {
                id: 'desc',
            },
        });
        if (!enterprises)
            throw new common_1.ForbiddenException("Il n'y a aucun entreprise!");
        return enterprises;
    }
    async filterEnterprise(dto) {
        const enterprises = await this.prisma.entreprise.findMany({
            where: {
                OR: [
                    {
                        nom: {
                            contains: dto.searchkey,
                        },
                    },
                    {
                        descriptionA: {
                            contains: dto.searchkey,
                        },
                    },
                    {
                        descriptionB: {
                            contains: dto.searchkey,
                        },
                    },
                ],
            },
        });
        if (!enterprises)
            throw new common_1.ForbiddenException("Il n'y a aucun entreprise!");
        return enterprises;
    }
    async getEnterpriseAdmin(id) {
        var _a, _b;
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
        const redacteurExists = [1, 2].includes((_a = redacteur === null || redacteur === void 0 ? void 0 : redacteur.role_utilisateur) === null || _a === void 0 ? void 0 : _a.id);
        if (!redacteurExists) {
            throw new common_1.ForbiddenException("Le redacteur sélectionné n'éxiste pas");
        }
        else if (((_b = redacteur === null || redacteur === void 0 ? void 0 : redacteur.role_utilisateur) === null || _b === void 0 ? void 0 : _b.id) == 1) {
            const enterprises = await this.prisma.entreprise.findMany({
                orderBy: {
                    id: 'desc',
                },
            });
            if (!enterprises)
                throw new common_1.ForbiddenException("Il n'y a aucun entreprise!");
            return enterprises;
        }
        else {
            const enterprises = await this.prisma.entreprise.findMany({
                orderBy: {
                    id: 'desc',
                },
                where: {
                    idRedacteur: id,
                },
            });
            if (!enterprises)
                throw new common_1.ForbiddenException("Il n'y a aucun entreprise!");
            return enterprises;
        }
    }
    async filterEnterpriseAdmin(id, dto) {
        var _a, _b;
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
        const redacteurExists = [1, 2].includes((_a = redacteur === null || redacteur === void 0 ? void 0 : redacteur.role_utilisateur) === null || _a === void 0 ? void 0 : _a.id);
        if (!redacteurExists) {
            throw new common_1.ForbiddenException("Le redacteur sélectionné n'éxiste pas");
        }
        else if (((_b = redacteur === null || redacteur === void 0 ? void 0 : redacteur.role_utilisateur) === null || _b === void 0 ? void 0 : _b.id) == 1) {
            const enterprises = await this.prisma.entreprise.findMany({
                where: {
                    nom: {
                        contains: dto.searchkey,
                    },
                },
            });
            if (!enterprises)
                throw new common_1.ForbiddenException("Il n'y a aucun entreprise!");
            return enterprises;
        }
        else {
            const enterprises = await this.prisma.entreprise.findMany({
                where: {
                    idRedacteur: id,
                    nom: {
                        contains: dto.searchkey,
                    },
                },
            });
            if (!enterprises)
                throw new common_1.ForbiddenException("Il n'y a aucun entreprise!");
            return enterprises;
        }
    }
    async getEnterpriseBySlug(slug) {
        const enterprise = await this.prisma.entreprise.findUnique({
            where: {
                slug,
            },
        });
        if (!enterprise)
            throw new common_1.ForbiddenException("L'identifiant n'existe pas!");
        return enterprise;
    }
    async updateEnterpriseBySlug(slug, id, dto) {
        var _a;
        const enterprise = await this.prisma.entreprise.findUnique({
            where: {
                slug,
            },
        });
        if (!enterprise)
            throw new common_1.ForbiddenException("L'identifiant n'éxiste pas!");
        else {
            const slugTitle = dto.nom
                .toLocaleLowerCase()
                .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')
                .trim()
                .split(' ')
                .join('-');
            const slugExists = await this.prisma.entreprise.findUnique({
                where: {
                    slug: slugTitle,
                },
            });
            if (slugExists && slugTitle !== slug) {
                throw new common_1.ForbiddenException('Cet entreprise existe déjà!');
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
            if (enterprise.idRedacteur !== id &&
                ((_a = redacteur === null || redacteur === void 0 ? void 0 : redacteur.role_utilisateur) === null || _a === void 0 ? void 0 : _a.id) !== 1) {
                throw new common_1.ForbiddenException("Cette entreprise n'est pas la votre!");
            }
            return this.prisma.entreprise.update({
                data: {
                    nom: dto.nom,
                    slug: slugTitle,
                    brand: dto.brand,
                    email: dto.email,
                    telephone: dto.telephone,
                    anneeCreation: dto.anneeCreation,
                    urlWebsite: dto.urlWebsite,
                    descriptionA: dto.descriptionA,
                    descriptionB: dto.descriptionB,
                    textContact: dto.textContact,
                },
                where: {
                    slug,
                },
            });
        }
    }
    async updateIllustrationBySlug(slug, id, dto) {
        var _a;
        const enterpriseBySlug = await this.prisma.entreprise.findUnique({
            where: {
                slug,
            },
        });
        if (!enterpriseBySlug) {
            throw new common_1.ForbiddenException("Cet illustration d'article n'existe pas!");
        }
        if (fs.existsSync(`./images/${enterpriseBySlug.illustration}`)) {
            fs.unlinkSync(`./images/${enterpriseBySlug.illustration}`);
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
        if (enterpriseBySlug.idRedacteur !== id &&
            ((_a = redacteur === null || redacteur === void 0 ? void 0 : redacteur.role_utilisateur) === null || _a === void 0 ? void 0 : _a.id) !== 1) {
            throw new common_1.ForbiddenException("Cette entreprise n'est pas la votre!");
        }
        return await this.prisma.entreprise.update({
            data: {
                illustration: dto.illustration,
            },
            where: {
                slug,
            },
        });
    }
    async isAbonneeBySlug(slug, dto) {
        const enterpriseBySlug = await this.prisma.entreprise.findUnique({
            where: {
                slug,
            },
        });
        if (!enterpriseBySlug) {
            throw new common_1.ForbiddenException("Cette entreprise n'existe pas!");
        }
        return await this.prisma.entreprise.update({
            data: {
                abonnee: dto.abonnee,
            },
            where: {
                slug,
            },
            select: {
                id: true,
                abonnee: true,
            },
        });
    }
    async deleteEnterpriseBySlug(slug, id) {
        var _a;
        const enterpriseExists = await this.prisma.entreprise.findUnique({
            where: {
                slug,
            },
        });
        if (!enterpriseExists) {
            throw new common_1.ForbiddenException("L'identifiant n'existe pas!");
        }
        if (fs.existsSync(`./images/${enterpriseExists.illustration}`)) {
            fs.unlinkSync(`./images/${enterpriseExists.illustration}`);
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
        if (enterpriseExists.idRedacteur !== id &&
            ((_a = redacteur === null || redacteur === void 0 ? void 0 : redacteur.role_utilisateur) === null || _a === void 0 ? void 0 : _a.id) !== 1) {
            throw new common_1.ForbiddenException("Cette entreprise n'est pas la votre!");
        }
        return await this.prisma.entreprise.delete({
            where: {
                slug,
            },
        });
    }
};
EnterpriseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EnterpriseService);
exports.EnterpriseService = EnterpriseService;
//# sourceMappingURL=enterprise.service.js.map