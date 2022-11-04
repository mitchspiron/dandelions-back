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
let UsersService = class UsersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getUsersById(id) {
        const UsersById = await this.prisma.utilisateur.findUnique({
            where: {
                id: Number(id),
            },
        });
        if (!UsersById)
            throw new common_1.ForbiddenException("L'identifiant n'existe pas!");
        return UsersById;
    }
    async getUsers() {
        const users = await this.prisma.utilisateur.findMany();
        if (!users)
            throw new common_1.ForbiddenException("Il n'y a aucun utilisateur!");
        return users;
    }
    async createUsers(dto) {
        const hash = await this.hashData(dto.motDePasse);
        return await this.prisma.utilisateur.create({
            data: {
                nom: dto.nom,
                prenom: dto.prenom,
                illustration: dto.illustration,
                email: dto.email,
                telephone: dto.telephone,
                role: Number(dto.role),
                motDePasse: hash,
            },
        });
    }
    async updateUsersInfoById(id, dto) {
        const UsersById = await this.prisma.utilisateur.findUnique({
            where: {
                id: Number(id),
            },
        });
        if (!UsersById)
            throw new common_1.ForbiddenException("Lidentifiant n'éxiste pas!");
        else {
            return await this.prisma.utilisateur.update({
                data: {
                    nom: dto.nom,
                    prenom: dto.prenom,
                    illustration: dto.illustration,
                    email: dto.email,
                    telephone: dto.telephone,
                    role: Number(dto.role),
                },
                select: {
                    id: true,
                    nom: true,
                    prenom: true,
                    illustration: true,
                    email: true,
                    telephone: true,
                    role: true,
                },
                where: {
                    id: Number(id),
                },
            });
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
                        id: Number(id),
                    },
                });
            }
        }
    }
    async deleteUsersById(id) {
        const UsersById = await this.prisma.utilisateur.delete({
            where: {
                id: Number(id),
            },
        });
        if (!UsersById)
            throw new common_1.ForbiddenException("L'identifiant n'existe pas!");
        return UsersById;
    }
    hashData(data) {
        return bcrypt.hash(data, 10);
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map