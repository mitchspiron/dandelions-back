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
exports.CommentService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CommentService = class CommentService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createComment(slug, dto) {
        const userExists = await this.prisma.utilisateur.findUnique({
            where: {
                id: Number(dto.idUtilisateur),
            },
        });
        if (!userExists) {
            throw new common_1.ForbiddenException("Cet utilisateur n'existe pas!");
        }
        const articleExists = await this.prisma.article.findUnique({
            where: {
                slug,
            },
        });
        if (!articleExists) {
            throw new common_1.ForbiddenException("Cet article n'existe pas!");
        }
        return await this.prisma.commentaire.create({
            data: {
                idUtilisateur: Number(dto.idUtilisateur),
                idArticle: articleExists.id,
                contenu: dto.contenu,
            },
        });
    }
    async getCommentByPost(slug) {
        const postExists = await this.prisma.article.findUnique({
            where: {
                slug,
            },
        });
        if (!postExists) {
            throw new common_1.ForbiddenException("Cet article n'existe pas");
        }
        return await this.prisma.commentaire.findMany({
            select: {
                id: true,
                utilisateur: {
                    select: {
                        id: true,
                        nom: true,
                        prenom: true,
                        illustration: true,
                    },
                },
                idArticle: true,
                article: {
                    select: {
                        id: true,
                        idRedacteur: true,
                    },
                },
                contenu: true,
                createdAt: true,
                reponse: {
                    select: {
                        id: true,
                        utilisateur: {
                            select: {
                                id: true,
                                nom: true,
                                prenom: true,
                                illustration: true,
                            },
                        },
                        contenu: true,
                        createdAt: true,
                    },
                    orderBy: {
                        id: 'desc',
                    },
                },
            },
            where: {
                idArticle: Number(postExists.id),
            },
            orderBy: {
                id: 'desc',
            },
        });
    }
    async getCommentById(id) {
        const commentExists = await this.prisma.commentaire.findUnique({
            where: {
                id,
            },
        });
        if (!commentExists) {
            throw new common_1.ForbiddenException('Commentaire introuvable');
        }
        return await this.prisma.commentaire.findUnique({
            select: {
                id: true,
                utilisateur: {
                    select: {
                        id: true,
                        nom: true,
                        prenom: true,
                        illustration: true,
                    },
                },
                idArticle: true,
                contenu: true,
                createdAt: true,
                reponse: {
                    select: {
                        id: true,
                        utilisateur: {
                            select: {
                                id: true,
                                nom: true,
                                prenom: true,
                                illustration: true,
                            },
                        },
                        contenu: true,
                        createdAt: true,
                    },
                    orderBy: {
                        id: 'desc',
                    },
                },
            },
            where: {
                id,
            },
        });
    }
    async updateCommentById(id, dto) {
        const commentExists = await this.prisma.commentaire.findUnique({
            where: {
                id,
            },
        });
        if (!commentExists) {
            throw new common_1.ForbiddenException('Commentaire introuvable');
        }
        return await this.prisma.commentaire.update({
            data: {
                contenu: dto.contenu,
            },
            where: {
                id,
            },
        });
    }
    async deleteCommentById(id) {
        const commentExists = await this.prisma.commentaire.findUnique({
            where: {
                id,
            },
        });
        if (!commentExists) {
            throw new common_1.ForbiddenException('Commentaire introuvable');
        }
        return await this.prisma.commentaire.delete({
            where: {
                id,
            },
        });
    }
};
CommentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CommentService);
exports.CommentService = CommentService;
//# sourceMappingURL=comment.service.js.map