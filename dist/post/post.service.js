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
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const fs = require("fs");
let PostService = class PostService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createPost(dto) {
        var _a;
        const redacteur = await this.prisma.utilisateur.findUnique({
            where: {
                id: Number(dto.idRedacteur),
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
        const categorieExists = await this.prisma.categorie_article.findUnique({
            where: {
                id: Number(dto.idCategorie),
            },
        });
        if (!categorieExists) {
            throw new common_1.ForbiddenException("La catégorie sélectionnée n'éxiste pas");
        }
        const slug = dto.titre
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
            throw new common_1.ForbiddenException('Cet article existe déja');
        }
        return this.prisma.article.create({
            data: {
                idRedacteur: Number(dto.idRedacteur),
                idCategorie: Number(dto.idCategorie),
                titre: dto.titre,
                slug,
                description: dto.description,
                illustration: dto.illustration,
                contenu: dto.contenu,
                top: false,
                recommadee: false,
                etat: 1,
            },
        });
    }
    async getPost(id) {
        const user = await this.prisma.utilisateur.findUnique({
            where: {
                id: Number(id),
            },
        });
        if (!user) {
            throw new common_1.ForbiddenException("L'utilisateur sélectionné n'éxiste pas");
        }
        else if (user.role !== 1) {
            const post = await this.prisma.article.findMany({
                orderBy: {
                    id: 'desc',
                },
                where: {
                    idRedacteur: Number(id),
                },
                select: {
                    id: true,
                    utilisateur: {
                        select: {
                            id: true,
                            nom: true,
                            prenom: true,
                            role: true,
                        },
                    },
                    categorie_article: {
                        select: {
                            id: true,
                            nomCategorie: true,
                            slug: true,
                        },
                    },
                    titre: true,
                    slug: true,
                    illustration: true,
                    description: true,
                    top: true,
                    recommadee: true,
                    etat_article: {
                        select: {
                            id: true,
                            nomEtat: true,
                        },
                    },
                    createdAt: true,
                },
            });
            if (!post) {
                throw new common_1.ForbiddenException("Il n'y a aucun article!");
            }
            return post;
        }
        const post = await this.prisma.article.findMany({
            orderBy: {
                id: 'desc',
            },
            select: {
                id: true,
                utilisateur: {
                    select: {
                        id: true,
                        nom: true,
                        prenom: true,
                        role: true,
                    },
                },
                categorie_article: {
                    select: {
                        id: true,
                        nomCategorie: true,
                        slug: true,
                    },
                },
                titre: true,
                slug: true,
                illustration: true,
                description: true,
                top: true,
                recommadee: true,
                etat_article: {
                    select: {
                        id: true,
                        nomEtat: true,
                    },
                },
                createdAt: true,
            },
        });
        if (!post) {
            throw new common_1.ForbiddenException("Il n'y a aucun article!");
        }
        return post;
    }
    async filterPost(id, dto) {
        const user = await this.prisma.utilisateur.findUnique({
            where: {
                id: Number(id),
            },
        });
        if (!user) {
            throw new common_1.ForbiddenException("L'utilisateur sélectionné n'éxiste pas");
        }
        else if (user.role !== 1) {
            const post = await this.prisma.article.findMany({
                orderBy: {
                    id: 'desc',
                },
                where: {
                    idRedacteur: Number(id),
                    AND: [
                        {
                            titre: {
                                contains: dto.searchkey,
                            },
                        },
                        {
                            categorie_article: {
                                nomCategorie: {
                                    contains: dto.searchCategory,
                                },
                            },
                        },
                        {
                            etat_article: {
                                nomEtat: {
                                    contains: dto.searchEtat,
                                },
                            },
                        },
                    ],
                },
                select: {
                    id: true,
                    utilisateur: {
                        select: {
                            id: true,
                            nom: true,
                            prenom: true,
                            role: true,
                        },
                    },
                    categorie_article: {
                        select: {
                            id: true,
                            nomCategorie: true,
                            slug: true,
                        },
                    },
                    titre: true,
                    slug: true,
                    illustration: true,
                    description: true,
                    contenu: true,
                    top: true,
                    recommadee: true,
                    etat_article: {
                        select: {
                            id: true,
                            nomEtat: true,
                        },
                    },
                    createdAt: true,
                },
            });
            if (!post) {
                throw new common_1.ForbiddenException("Il n'y a aucun article!");
            }
            return post;
        }
        const post = await this.prisma.article.findMany({
            orderBy: {
                id: 'desc',
            },
            where: {
                AND: [
                    {
                        titre: {
                            contains: dto.searchkey,
                        },
                    },
                    {
                        categorie_article: {
                            nomCategorie: {
                                contains: dto.searchCategory,
                            },
                        },
                    },
                    {
                        etat_article: {
                            nomEtat: {
                                contains: dto.searchEtat,
                            },
                        },
                    },
                ],
            },
            select: {
                id: true,
                utilisateur: {
                    select: {
                        id: true,
                        nom: true,
                        prenom: true,
                        role: true,
                    },
                },
                categorie_article: {
                    select: {
                        id: true,
                        nomCategorie: true,
                        slug: true,
                    },
                },
                titre: true,
                slug: true,
                illustration: true,
                description: true,
                contenu: true,
                top: true,
                recommadee: true,
                etat_article: {
                    select: {
                        id: true,
                        nomEtat: true,
                    },
                },
                createdAt: true,
            },
        });
        if (!post) {
            throw new common_1.ForbiddenException("Il n'y a aucun article!");
        }
        return post;
    }
    async filterPostVisitor(dto) {
        const post = await this.prisma.article.findMany({
            orderBy: {
                id: 'desc',
            },
            where: {
                etat: 5,
                AND: [
                    {
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
                    {
                        categorie_article: {
                            nomCategorie: {
                                contains: dto.searchCategory,
                            },
                        },
                    },
                ],
            },
            select: {
                id: true,
                utilisateur: {
                    select: {
                        id: true,
                        nom: true,
                        prenom: true,
                        role: true,
                    },
                },
                categorie_article: {
                    select: {
                        id: true,
                        nomCategorie: true,
                        slug: true,
                    },
                },
                titre: true,
                slug: true,
                illustration: true,
                description: true,
                contenu: true,
                top: true,
                recommadee: true,
                etat_article: {
                    select: {
                        id: true,
                        nomEtat: true,
                    },
                },
                createdAt: true,
            },
        });
        if (!post) {
            throw new common_1.ForbiddenException("Il n'y a aucun article!");
        }
        return post;
    }
    async takeFirstLastestPost() {
        const post = await this.prisma.article.findMany({
            orderBy: {
                id: 'desc',
            },
            where: {
                etat: 5,
            },
            take: 1,
            select: {
                id: true,
                utilisateur: {
                    select: {
                        id: true,
                        nom: true,
                        prenom: true,
                        role: true,
                    },
                },
                categorie_article: {
                    select: {
                        id: true,
                        nomCategorie: true,
                        slug: true,
                    },
                },
                titre: true,
                slug: true,
                illustration: true,
                description: true,
                top: true,
                recommadee: true,
                etat_article: {
                    select: {
                        id: true,
                        nomEtat: true,
                    },
                },
                createdAt: true,
            },
        });
        if (!post) {
            throw new common_1.ForbiddenException("Il n'y a aucun article!");
        }
        return post;
    }
    async skipFisrtLastestPost() {
        const post = await this.prisma.article.findMany({
            orderBy: {
                id: 'desc',
            },
            where: {
                etat: 5,
            },
            skip: 1,
            take: 4,
            select: {
                id: true,
                utilisateur: {
                    select: {
                        id: true,
                        nom: true,
                        prenom: true,
                        role: true,
                    },
                },
                categorie_article: {
                    select: {
                        id: true,
                        nomCategorie: true,
                        slug: true,
                    },
                },
                titre: true,
                slug: true,
                illustration: true,
                description: true,
                top: true,
                recommadee: true,
                etat_article: {
                    select: {
                        id: true,
                        nomEtat: true,
                    },
                },
                createdAt: true,
            },
        });
        if (!post) {
            throw new common_1.ForbiddenException("Il n'y a aucun article!");
        }
        return post;
    }
    async getPublishedPost() {
        const post = await this.prisma.article.findMany({
            orderBy: {
                id: 'desc',
            },
            where: {
                etat: 5,
            },
            select: {
                id: true,
                utilisateur: {
                    select: {
                        id: true,
                        nom: true,
                        prenom: true,
                        role: true,
                    },
                },
                categorie_article: {
                    select: {
                        id: true,
                        nomCategorie: true,
                        slug: true,
                    },
                },
                titre: true,
                slug: true,
                illustration: true,
                description: true,
                top: true,
                recommadee: true,
                etat_article: {
                    select: {
                        id: true,
                        nomEtat: true,
                    },
                },
                createdAt: true,
            },
        });
        if (!post) {
            throw new common_1.ForbiddenException("Il n'y a aucun article!");
        }
        return post;
    }
    async getPublishedPostBySlug(slug) {
        const post = await this.prisma.article.findMany({
            orderBy: {
                id: 'desc',
            },
            where: {
                etat: 5,
                categorie_article: {
                    slug,
                },
            },
            select: {
                id: true,
                utilisateur: {
                    select: {
                        id: true,
                        nom: true,
                        prenom: true,
                        role: true,
                    },
                },
                categorie_article: {
                    select: {
                        id: true,
                        nomCategorie: true,
                        slug: true,
                    },
                },
                titre: true,
                slug: true,
                illustration: true,
                description: true,
                top: true,
                recommadee: true,
                etat_article: {
                    select: {
                        id: true,
                        nomEtat: true,
                    },
                },
                createdAt: true,
            },
        });
        if (!post) {
            throw new common_1.ForbiddenException("Il n'y a aucun article!");
        }
        return post;
    }
    async filterPublishedPostBySlug(slug, dto) {
        const post = await this.prisma.article.findMany({
            orderBy: {
                id: 'desc',
            },
            where: {
                etat: 5,
                categorie_article: {
                    slug,
                },
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
                utilisateur: {
                    select: {
                        id: true,
                        nom: true,
                        prenom: true,
                        role: true,
                    },
                },
                categorie_article: {
                    select: {
                        id: true,
                        nomCategorie: true,
                        slug: true,
                    },
                },
                titre: true,
                slug: true,
                illustration: true,
                description: true,
                contenu: true,
                top: true,
                recommadee: true,
                etat_article: {
                    select: {
                        id: true,
                        nomEtat: true,
                    },
                },
                createdAt: true,
            },
        });
        if (!post) {
            throw new common_1.ForbiddenException("Il n'y a aucun article!");
        }
        return post;
    }
    async getRecommandedPost() {
        const post = await this.prisma.article.findMany({
            orderBy: {
                id: 'desc',
            },
            where: {
                etat: 5,
                recommadee: true,
            },
            select: {
                id: true,
                utilisateur: {
                    select: {
                        id: true,
                        nom: true,
                        prenom: true,
                        role: true,
                    },
                },
                categorie_article: {
                    select: {
                        id: true,
                        nomCategorie: true,
                        slug: true,
                    },
                },
                titre: true,
                slug: true,
                illustration: true,
                description: true,
                top: true,
                recommadee: true,
                etat_article: {
                    select: {
                        id: true,
                        nomEtat: true,
                    },
                },
                createdAt: true,
            },
        });
        if (!post) {
            throw new common_1.ForbiddenException("Il n'y a aucun article!");
        }
        return post;
    }
    async getTopPost() {
        const post = await this.prisma.article.findMany({
            orderBy: {
                id: 'desc',
            },
            where: {
                etat: 5,
                top: true,
            },
            select: {
                id: true,
                utilisateur: {
                    select: {
                        id: true,
                        nom: true,
                        prenom: true,
                        role: true,
                    },
                },
                categorie_article: {
                    select: {
                        id: true,
                        nomCategorie: true,
                        slug: true,
                    },
                },
                titre: true,
                slug: true,
                illustration: true,
                description: true,
                top: true,
                recommadee: true,
                etat_article: {
                    select: {
                        id: true,
                        nomEtat: true,
                    },
                },
                createdAt: true,
            },
        });
        if (!post) {
            throw new common_1.ForbiddenException("Il n'y a aucun article!");
        }
        return post;
    }
    async getPostBySlug(slug) {
        const postBySlug = await this.prisma.article.findUnique({
            where: {
                slug,
            },
            select: {
                id: true,
                utilisateur: {
                    select: {
                        id: true,
                        nom: true,
                        prenom: true,
                        role: true,
                    },
                },
                categorie_article: {
                    select: {
                        id: true,
                        nomCategorie: true,
                        slug: true,
                    },
                },
                titre: true,
                slug: true,
                illustration: true,
                description: true,
                contenu: true,
                top: true,
                recommadee: true,
                etat_article: {
                    select: {
                        id: true,
                        nomEtat: true,
                    },
                },
                createdAt: true,
                commentaire: {
                    select: {
                        id: true,
                        idUtilisateur: true,
                        contenu: true,
                        createdAt: true,
                        reponse: {
                            select: {
                                id: true,
                                idUtilisateur: true,
                                contenu: true,
                                createdAt: true,
                            },
                        },
                    },
                },
            },
        });
        if (!postBySlug) {
            throw new common_1.ForbiddenException("Cet article n'existe pas!");
        }
        return postBySlug;
    }
    async updatePostBySlug(slug, id, dto) {
        var _a;
        const post = await this.prisma.article.findUnique({
            where: {
                slug,
            },
        });
        if (!post) {
            throw new common_1.ForbiddenException("L'article n'éxiste pas!");
        }
        else {
            const updatedSlug = dto.titre
                .toLocaleLowerCase()
                .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')
                .trim()
                .split(' ')
                .join('-');
            const titrePostExist = await this.prisma.article.findUnique({
                where: {
                    slug: updatedSlug,
                },
            });
            if (titrePostExist && slug !== updatedSlug) {
                throw new common_1.ForbiddenException("Ce titre d'article existe déja!");
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
            if (post.idRedacteur !== id && ((_a = redacteur === null || redacteur === void 0 ? void 0 : redacteur.role_utilisateur) === null || _a === void 0 ? void 0 : _a.id) !== 1) {
                throw new common_1.ForbiddenException("Cette article n'est pas la votre!");
            }
            return await this.prisma.article.update({
                data: {
                    titre: dto.titre,
                    idCategorie: Number(dto.idCategorie),
                    description: dto.description,
                    contenu: dto.contenu,
                    slug: updatedSlug,
                },
                where: {
                    slug,
                },
            });
        }
    }
    async updateIllustrationBySlug(slug, id, dto) {
        var _a;
        const postBySlug = await this.prisma.article.findUnique({
            where: {
                slug,
            },
        });
        if (!postBySlug) {
            throw new common_1.ForbiddenException("Cet illustration d'article n'existe pas!");
        }
        if (fs.existsSync(`./images/${postBySlug.illustration}`)) {
            fs.unlinkSync(`./images/${postBySlug.illustration}`);
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
        if (postBySlug.idRedacteur !== id &&
            ((_a = redacteur === null || redacteur === void 0 ? void 0 : redacteur.role_utilisateur) === null || _a === void 0 ? void 0 : _a.id) !== 1) {
            throw new common_1.ForbiddenException("Cette article n'est pas la votre!");
        }
        return await this.prisma.article.update({
            data: {
                illustration: dto.illustration,
            },
            where: {
                slug,
            },
        });
    }
    async deletePostBySlug(slug, id) {
        var _a;
        const postBySlug = await this.prisma.article.findUnique({
            where: {
                slug,
            },
        });
        if (!postBySlug) {
            throw new common_1.ForbiddenException("Cet article n'existe pas!");
        }
        if (fs.existsSync(`./images/${postBySlug.illustration}`)) {
            fs.unlinkSync(`./images/${postBySlug.illustration}`);
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
        if (postBySlug.idRedacteur !== id &&
            ((_a = redacteur === null || redacteur === void 0 ? void 0 : redacteur.role_utilisateur) === null || _a === void 0 ? void 0 : _a.id) !== 1) {
            throw new common_1.ForbiddenException("Cette article n'est pas la votre!");
        }
        return await this.prisma.article.delete({
            where: {
                slug,
            },
        });
    }
    async updateStateBySlug(slug, dto) {
        const postBySlug = await this.prisma.article.findUnique({
            where: {
                slug,
            },
        });
        if (!postBySlug) {
            throw new common_1.ForbiddenException("Cet article n'existe pas!");
        }
        return await this.prisma.article.update({
            data: {
                etat: Number(dto.etat),
            },
            where: {
                slug,
            },
            select: {
                id: true,
                etat_article: {
                    select: {
                        id: true,
                        nomEtat: true,
                    },
                },
            },
        });
    }
    async switchToRecommandedBySlug(slug, dto) {
        const postBySlug = await this.prisma.article.findUnique({
            where: {
                slug,
            },
        });
        if (!postBySlug) {
            throw new common_1.ForbiddenException("Cet article n'existe pas!");
        }
        return await this.prisma.article.update({
            data: {
                recommadee: dto.recommadee,
            },
            where: {
                slug,
            },
            select: {
                id: true,
                recommadee: true,
            },
        });
    }
    async switchTopBySlug(slug, dto) {
        const postBySlug = await this.prisma.article.findUnique({
            where: {
                slug,
            },
        });
        if (!postBySlug) {
            throw new common_1.ForbiddenException("Cet article n'existe pas!");
        }
        return await this.prisma.article.update({
            data: {
                top: dto.top,
            },
            where: {
                slug,
            },
            select: {
                id: true,
                top: true,
            },
        });
    }
};
PostService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PostService);
exports.PostService = PostService;
//# sourceMappingURL=post.service.js.map