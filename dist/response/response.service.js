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
exports.ResponseService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ResponseService = class ResponseService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createResponse(id, dto) {
        const userExists = await this.prisma.utilisateur.findUnique({
            where: {
                id: Number(dto.idUtilisateur),
            },
        });
        if (!userExists) {
            throw new common_1.ForbiddenException("Cet utilisateur n'existe pas!");
        }
        const commentExists = await this.prisma.commentaire.findUnique({
            where: {
                id,
            },
        });
        if (!commentExists) {
            throw new common_1.ForbiddenException('Commentaire introuvable!');
        }
        return await this.prisma.reponse.create({
            data: {
                idUtilisateur: Number(dto.idUtilisateur),
                idCommentaire: commentExists.id,
                contenu: dto.contenu,
            },
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
                idCommentaire: true,
                contenu: true,
                createdAt: true,
            },
        });
    }
    async getResponseByComment(id) {
        const commentExists = await this.prisma.commentaire.findUnique({
            where: {
                id,
            },
        });
        if (!commentExists) {
            throw new common_1.ForbiddenException('Commentaire introuvable');
        }
        return await this.prisma.reponse.findMany({
            where: {
                idCommentaire: Number(commentExists.id),
            },
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
                        illustration: true,
                    },
                },
                idCommentaire: true,
                contenu: true,
                createdAt: true,
            },
        });
    }
    async getResponseById(id) {
        const responseExists = await this.prisma.reponse.findUnique({
            where: {
                id,
            },
        });
        if (!responseExists) {
            throw new common_1.ForbiddenException('Reponse introuvable');
        }
        return await this.prisma.reponse.findUnique({
            where: {
                id,
            },
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
                idCommentaire: true,
                contenu: true,
                createdAt: true,
            },
        });
    }
    async updateResponseById(id, dto) {
        const responseExists = await this.prisma.reponse.findUnique({
            where: {
                id,
            },
        });
        if (!responseExists) {
            throw new common_1.ForbiddenException('Reponse introuvable');
        }
        return await this.prisma.reponse.update({
            data: {
                contenu: dto.contenu,
            },
            where: {
                id,
            },
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
                idCommentaire: true,
                contenu: true,
                createdAt: true,
            },
        });
    }
    async deleteResponseById(id) {
        const responseExists = await this.prisma.reponse.findUnique({
            where: {
                id,
            },
        });
        if (!responseExists) {
            throw new common_1.ForbiddenException('Reponse introuvable');
        }
        return await this.prisma.reponse.delete({
            where: {
                id,
            },
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
                idCommentaire: true,
                contenu: true,
                createdAt: true,
            },
        });
    }
};
ResponseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ResponseService);
exports.ResponseService = ResponseService;
//# sourceMappingURL=response.service.js.map