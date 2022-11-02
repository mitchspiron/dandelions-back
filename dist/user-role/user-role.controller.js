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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoleController = void 0;
const common_1 = require("@nestjs/common");
const user_role_service_1 = require("./user-role.service");
const dto_1 = require("./dto");
let UserRoleController = class UserRoleController {
    constructor(userRoleService) {
        this.userRoleService = userRoleService;
    }
    async getUserRole() {
        return await this.userRoleService.getUserRole();
    }
    async getUserRoleById(id) {
        return await this.userRoleService.getUserRoleById(id);
    }
    async createUserRole(dto) {
        return await this.userRoleService.createUserRole(dto);
    }
    async updateUserRoleById(id, dto) {
        return await this.userRoleService.updateUserRoleById(id, dto);
    }
    async deleteUserRoleById(id) {
        return await this.userRoleService.deleteUserRoleById(id);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserRoleController.prototype, "getUserRole", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserRoleController.prototype, "getUserRoleById", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.UserRoleDto]),
    __metadata("design:returntype", Promise)
], UserRoleController.prototype, "createUserRole", null);
__decorate([
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dto_1.UserRoleDto]),
    __metadata("design:returntype", Promise)
], UserRoleController.prototype, "updateUserRoleById", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserRoleController.prototype, "deleteUserRoleById", null);
UserRoleController = __decorate([
    (0, common_1.Controller)('user-role'),
    __metadata("design:paramtypes", [user_role_service_1.UserRoleService])
], UserRoleController);
exports.UserRoleController = UserRoleController;
//# sourceMappingURL=user-role.controller.js.map