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
exports.WriterRequestService = void 0;
const common_1 = require("@nestjs/common");
const mailer_service_1 = require("../mailer/mailer.service");
const prisma_service_1 = require("../prisma/prisma.service");
let WriterRequestService = class WriterRequestService {
    constructor(prisma, mailService) {
        this.prisma = prisma;
        this.mailService = mailService;
    }
    async createWriterRequest(dto) {
        const userExist = await this.prisma.utilisateur.findUnique({
            where: {
                id: Number(dto.idUtilisateur),
            },
        });
        if (!userExist) {
            throw new common_1.ForbiddenException("Cet utilisateur n'existe pas");
        }
        const writerExist = await this.prisma.utilisateur.findMany({
            where: {
                id: Number(dto.idUtilisateur),
                OR: [
                    {
                        role: 1,
                    },
                    {
                        role: 2,
                    },
                ],
            },
        });
        if (writerExist.length !== 0) {
            throw new common_1.ForbiddenException('Vous êtes déjà un rédacteur');
        }
        const userAlreadySendRequest = await this.prisma.demande_redacteur.findMany({
            where: {
                idUtilisateur: Number(dto.idUtilisateur),
            },
        });
        if (userAlreadySendRequest.length !== 0) {
            throw new common_1.ForbiddenException('Vous avez déjà envoyé votre demande');
        }
        return await this.prisma.demande_redacteur.create({
            data: {
                idUtilisateur: Number(dto.idUtilisateur),
                acceptee: false,
            },
            select: {
                id: true,
                utilisateur: {
                    select: {
                        id: true,
                        nom: true,
                        prenom: true,
                        email: true,
                        telephone: true,
                    },
                },
                acceptee: true,
            },
        });
    }
    async getWriterRequest() {
        const writerRequest = await this.prisma.demande_redacteur.findMany({
            select: {
                id: true,
                utilisateur: {
                    select: {
                        id: true,
                        nom: true,
                        prenom: true,
                        email: true,
                        telephone: true,
                    },
                },
                acceptee: true,
            },
        });
        if (!writerRequest) {
            throw new common_1.ForbiddenException("Il n'y a aucune demande!");
        }
        return writerRequest;
    }
    async acceptWriterRequest(id, user) {
        const userExist = await this.prisma.utilisateur.findUnique({
            where: {
                id: user,
            },
        });
        if (!userExist) {
            throw new common_1.ForbiddenException("Cet utilisateur n'existe pas");
        }
        const writerRequestExist = await this.prisma.demande_redacteur.findUnique({
            where: {
                id,
            },
        });
        if (!writerRequestExist) {
            throw new common_1.ForbiddenException("Cet demande n'existe pas!");
        }
        else {
            const accepted = await this.prisma.utilisateur.update({
                data: {
                    role: 2,
                },
                where: {
                    id: user,
                },
                select: {
                    id: true,
                    email: true,
                    nom: true,
                    prenom: true,
                },
            });
            if (accepted) {
                await this.mailService
                    .sendMailAcceptWriterRequest(accepted.email, accepted.nom, accepted.prenom)
                    .then(() => console.log('Vérifier votre boîte email!'))
                    .catch((e) => {
                    console.log('mail', e);
                    throw new common_1.ForbiddenException("Un problème s'est produit, vérifier votre connexion internet!");
                });
                return await this.prisma.demande_redacteur.delete({
                    where: {
                        id,
                    },
                });
            }
            return accepted;
        }
    }
    async declineWriterRequest(id) {
        const writerRequestExist = await this.prisma.demande_redacteur.findUnique({
            where: {
                id,
            },
        });
        if (!writerRequestExist) {
            throw new common_1.ForbiddenException("Cet demande n'existe pas!");
        }
        else {
            const refused = await this.prisma.demande_redacteur.delete({
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
                            email: true,
                            telephone: true,
                        },
                    },
                    acceptee: true,
                },
            });
            await this.mailService
                .sendMailDeclineWriterRequest(refused.utilisateur.email, refused.utilisateur.nom, refused.utilisateur.prenom)
                .then(() => console.log('Vérifier votre boîte email!'))
                .catch((e) => {
                console.log('mail', e);
                throw new common_1.ForbiddenException("Un problème s'est produit, vérifier votre connexion internet!");
            });
            return refused;
        }
    }
};
WriterRequestService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        mailer_service_1.MailService])
], WriterRequestService);
exports.WriterRequestService = WriterRequestService;
//# sourceMappingURL=writer-request.service.js.map