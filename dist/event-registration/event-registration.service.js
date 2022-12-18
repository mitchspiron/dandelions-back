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
exports.EventRegistrationService = void 0;
const common_1 = require("@nestjs/common");
const mailer_service_1 = require("../mailer/mailer.service");
const prisma_service_1 = require("../prisma/prisma.service");
let EventRegistrationService = class EventRegistrationService {
    constructor(prisma, mailService) {
        this.prisma = prisma;
        this.mailService = mailService;
    }
    async createEventRegistration(dto) {
        const eventExist = await this.prisma.evenement.findUnique({
            where: {
                id: Number(dto.idEvenement),
            },
        });
        if (!eventExist) {
            throw new common_1.ForbiddenException("Cet evenement n'existe pas ou déja expiré");
        }
        const userExist = await this.prisma.utilisateur.findUnique({
            where: {
                id: Number(dto.idUtilisateur),
            },
        });
        if (!userExist) {
            throw new common_1.ForbiddenException("Cet utilisateur n'existe pas");
        }
        const userAlreadyRegistered = await this.prisma.inscription_evenement.findMany({
            where: {
                idUtilisateur: Number(dto.idUtilisateur),
                idEvenement: Number(dto.idEvenement),
            },
        });
        if (userAlreadyRegistered.length !== 0) {
            throw new common_1.ForbiddenException('Cet utilisateur est déja inscrit');
        }
        const event = await this.prisma.evenement.findUnique({
            where: {
                id: Number(dto.idEvenement),
            },
        });
        if (!event) {
            throw new common_1.ForbiddenException("Cet evenement n'existe pas ou déja expiré");
        }
        await this.mailService
            .sendMailEventRegistration(userExist.email, userExist.nom, userExist.prenom, event.titre, event.slug)
            .then(() => console.log('Vérifier votre boîte email!'))
            .catch((e) => {
            console.log('mail', e);
            throw new common_1.ForbiddenException("Un problème s'est produit, vérifier votre connexion internet!");
        });
        return await this.prisma.inscription_evenement.create({
            data: {
                idUtilisateur: Number(dto.idUtilisateur),
                idEvenement: Number(dto.idEvenement),
            },
            select: {
                id: true,
                evenement: {
                    select: {
                        id: true,
                        titre: true,
                    },
                },
                utilisateur: {
                    select: {
                        id: true,
                        nom: true,
                        prenom: true,
                        email: true,
                        telephone: true,
                    },
                },
            },
        });
    }
    async getEventRegistrationByEvent(slug) {
        const eventExists = await this.prisma.evenement.findUnique({
            where: {
                slug,
            },
        });
        if (!eventExists) {
            throw new common_1.ForbiddenException("Cet evenement n'existe pas");
        }
        return await this.prisma.inscription_evenement.findMany({
            where: {
                idEvenement: Number(eventExists.id),
            },
            select: {
                id: true,
                evenement: {
                    select: {
                        id: true,
                        titre: true,
                    },
                },
                utilisateur: {
                    select: {
                        id: true,
                        nom: true,
                        prenom: true,
                        email: true,
                        telephone: true,
                    },
                },
            },
        });
    }
    async filterEventRegistrationByEvent(slug, dto) {
        const eventExists = await this.prisma.evenement.findUnique({
            where: {
                slug,
            },
        });
        if (!eventExists) {
            throw new common_1.ForbiddenException("Cet evenement n'existe pas");
        }
        return await this.prisma.inscription_evenement.findMany({
            where: {
                idEvenement: Number(eventExists.id),
                OR: [
                    {
                        utilisateur: {
                            nom: {
                                contains: dto.searchkey,
                            },
                        },
                    },
                    {
                        utilisateur: {
                            prenom: {
                                contains: dto.searchkey,
                            },
                        },
                    },
                ],
            },
            select: {
                id: true,
                evenement: {
                    select: {
                        id: true,
                        titre: true,
                    },
                },
                utilisateur: {
                    select: {
                        id: true,
                        nom: true,
                        prenom: true,
                        email: true,
                        telephone: true,
                    },
                },
            },
        });
    }
};
EventRegistrationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        mailer_service_1.MailService])
], EventRegistrationService);
exports.EventRegistrationService = EventRegistrationService;
//# sourceMappingURL=event-registration.service.js.map