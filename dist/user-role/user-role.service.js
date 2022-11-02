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
exports.UserRoleService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let UserRoleService = class UserRoleService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getUserRoleById(id) {
        const UserRoleById = await this.prisma.role_utilisateur.findUnique({
            where: {
                id: Number(id),
            },
        });
        if (!UserRoleById)
            throw new common_1.ForbiddenException("L'identifiant n'existe pas!");
        return UserRoleById;
    }
    async getUserRole() {
        const userRole = await this.prisma.role_utilisateur.findMany();
        if (!userRole)
            throw new common_1.ForbiddenException("Il n'y a aucun role d'utilisateur!");
        return userRole;
    }
    async createUserRole(dto) {
        return await this.prisma.role_utilisateur.create({
            data: {
                nomRole: dto.nomRole,
            },
        });
    }
    async updateUserRoleById(id, dto) {
        const UserRoleById = await this.prisma.role_utilisateur.update({
            data: {
                nomRole: dto.nomRole,
            },
            where: {
                id: Number(id),
            },
        });
        if (!UserRoleById)
            throw new common_1.ForbiddenException("L'identifiant n'existe pas!");
        return UserRoleById;
    }
    async deleteUserRoleById(id) {
        const UserRoleById = await this.prisma.role_utilisateur.delete({
            where: {
                id: Number(id),
            },
        });
        if (!UserRoleById)
            throw new common_1.ForbiddenException("L'identifiant n'existe pas!");
        return UserRoleById;
    }
};
UserRoleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserRoleService);
exports.UserRoleService = UserRoleService;
//# sourceMappingURL=user-role.service.js.map