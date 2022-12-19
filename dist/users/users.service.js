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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = require("bcrypt");
const fs = require("fs");
const jwt_1 = require("@nestjs/jwt");
let UsersService = class UsersService {
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async getUsersById(id) {
        const UsersById = await this.prisma.utilisateur.findUnique({
            where: {
                id,
            },
            select: {
                id: true,
                nom: true,
                prenom: true,
                illustration: true,
                email: true,
                telephone: true,
                aPropos: true,
                role_utilisateur: {
                    select: {
                        id: true,
                        nomRole: true,
                    },
                },
                motDePasse: true,
            },
        });
        if (!UsersById)
            throw new common_1.ForbiddenException("L'identifiant n'existe pas!");
        return UsersById;
    }
    async getUsers() {
        const users = await this.prisma.utilisateur.findMany({
            orderBy: {
                id: 'desc',
            },
            select: {
                id: true,
                nom: true,
                prenom: true,
                illustration: true,
                email: true,
                telephone: true,
                aPropos: true,
                role_utilisateur: {
                    select: {
                        id: true,
                        nomRole: true,
                    },
                },
                motDePasse: true,
            },
        });
        if (!users)
            throw new common_1.ForbiddenException("Il n'y a aucun utilisateur!");
        return users;
    }
    async filterUsers(dto) {
        const users = await this.prisma.utilisateur.findMany({
            select: {
                id: true,
                nom: true,
                prenom: true,
                illustration: true,
                email: true,
                telephone: true,
                aPropos: true,
                role_utilisateur: {
                    select: {
                        id: true,
                        nomRole: true,
                    },
                },
                motDePasse: true,
            },
            where: {
                AND: [
                    {
                        OR: [
                            {
                                nom: {
                                    contains: dto.searchkey,
                                },
                            },
                            {
                                prenom: {
                                    contains: dto.searchkey,
                                },
                            },
                        ],
                    },
                    {
                        role_utilisateur: {
                            nomRole: {
                                contains: dto.searchRole,
                            },
                        },
                    },
                ],
            },
        });
        if (!users)
            throw new common_1.ForbiddenException("Il n'y a aucun utilisateur!");
        return users;
    }
    async createUsers(dto) {
        const userEmail = await this.prisma.utilisateur.findUnique({
            where: {
                email: dto.email,
            },
        });
        if (userEmail)
            throw new common_1.ForbiddenException('Cet email appartient déjà à un utilisateur');
        const hash = await this.hashData(dto.motDePasse);
        const illustration = Number(dto.role) === 1
            ? 'admin-user.png'
            : Number(dto.role) === 2
                ? 'writter-user.png'
                : 'normal-user.png';
        return await this.prisma.utilisateur.create({
            data: {
                nom: dto.nom,
                prenom: dto.prenom,
                illustration,
                email: dto.email,
                telephone: dto.telephone,
                aPropos: dto.aPropos,
                role: Number(dto.role),
                motDePasse: hash,
            },
        });
    }
    async updateUsersInfoById(id, dto) {
        const UsersById = await this.prisma.utilisateur.findUnique({
            where: {
                id,
            },
        });
        if (!UsersById)
            throw new common_1.ForbiddenException("Lidentifiant n'éxiste pas!");
        else {
            const user = await this.prisma.utilisateur.update({
                data: {
                    nom: dto.nom,
                    prenom: dto.prenom,
                    email: dto.email,
                    telephone: dto.telephone,
                    aPropos: dto.aPropos,
                    role: Number(dto.role),
                },
                select: {
                    id: true,
                    nom: true,
                    prenom: true,
                    email: true,
                    telephone: true,
                    aPropos: true,
                    role: true,
                },
                where: {
                    id,
                },
            });
            const token = await this.getToken(user.id, user.email, user.nom, user.prenom, user.role, UsersById.illustration, user.telephone, user.aPropos);
            return [user, token];
        }
    }
    async updateIllustrationById(id, dto) {
        const UsersById = await this.prisma.utilisateur.findUnique({
            where: {
                id,
            },
        });
        if (!UsersById)
            throw new common_1.ForbiddenException("L'identifiant n'éxiste pas!");
        else {
            if (fs.existsSync(`./images/${UsersById.illustration}`) &&
                !['admin-user.png', 'normal-user.png', 'writter-user.png'].includes(UsersById.illustration)) {
                fs.unlinkSync(`./images/${UsersById.illustration}`);
            }
            const user = await this.prisma.utilisateur.update({
                data: {
                    illustration: dto.illustration,
                },
                where: {
                    id,
                },
            });
            const token = await this.getToken(UsersById.id, UsersById.email, UsersById.nom, UsersById.prenom, UsersById.role, user.illustration, UsersById.telephone, UsersById.aPropos);
            return [user, token];
        }
    }
    async updateUsersPasswordById(id, dto) {
        const user = await this.prisma.utilisateur.findUnique({
            where: {
                id: Number(id),
            },
        });
        if (!user)
            throw new common_1.ForbiddenException("L'identifiant n'éxiste pas!");
        else {
            const isMatch = bcrypt.compareSync(dto.ancienMotDePasse, user.motDePasse);
            if (!isMatch) {
                throw new common_1.ForbiddenException('Mot de passe actuel incorrect!');
            }
            else {
                const hash = await this.hashData(dto.nouveauMotDePasse);
                return await this.prisma.utilisateur.update({
                    data: {
                        motDePasse: hash,
                    },
                    select: {
                        id: true,
                        motDePasse: true,
                    },
                    where: {
                        id,
                    },
                });
            }
        }
    }
    async deleteUsersById(id) {
        const UsersById = await this.prisma.utilisateur.findUnique({
            where: {
                id,
            },
        });
        if (!UsersById)
            throw new common_1.ForbiddenException("L'identifiant n'existe pas!");
        if (fs.existsSync(`./images/${UsersById.illustration}`) &&
            !['admin-user.png', 'normal-user.png', 'writter-user.png'].includes(UsersById.illustration)) {
            fs.unlinkSync(`./images/${UsersById.illustration}`);
        }
        return await this.prisma.utilisateur.delete({
            where: {
                id: Number(id),
            },
            select: {
                id: true,
                nom: true,
                prenom: true,
                illustration: true,
                email: true,
                telephone: true,
                aPropos: true,
                role_utilisateur: {
                    select: {
                        id: true,
                        nomRole: true,
                    },
                },
                motDePasse: true,
            },
        });
    }
    async getToken(idUser, emailUser, nomUser, prenomUser, roleUser, illustrationUser, telephoneUser, aProposUser) {
        const [at] = await Promise.all([
            this.jwtService.signAsync({
                sub: idUser,
                emailUser,
                nomUser,
                prenomUser,
                roleUser,
                illustrationUser,
                telephoneUser,
                aProposUser,
            }, {
                secret: 'at-secret',
                expiresIn: '1d',
            }),
        ]);
        return {
            access_token: at,
        };
    }
    hashData(data) {
        return bcrypt.hash(data, 10);
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, jwt_1.JwtService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map