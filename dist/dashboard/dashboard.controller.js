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
exports.DashboardController = void 0;
const common_1 = require("@nestjs/common");
const decorators_1 = require("@nestjs/common/decorators");
const dashboard_service_1 = require("./dashboard.service");
const dto_1 = require("./dto");
let DashboardController = class DashboardController {
    constructor(dashboardService) {
        this.dashboardService = dashboardService;
    }
    async getAllCountUserByYear(dto) {
        return await this.dashboardService.getAllCountUserByYear(dto);
    }
    async getAllCountEnterpriseByYear(dto) {
        return await this.dashboardService.getAllCountEnterpriseByYear(dto);
    }
    async getAllCountPostByYear(dto) {
        return await this.dashboardService.getAllCountPostByYear(dto);
    }
    async getAllCountEventByYear(dto) {
        return await this.dashboardService.getAllCountEventByYear(dto);
    }
    async getAllCountUsers() {
        return await this.dashboardService.getAllCountUsers();
    }
    async getAllCountEnterprises() {
        return await this.dashboardService.getAllCountEnterprises();
    }
    async getAllCountPosts() {
        return await this.dashboardService.getAllCountPosts();
    }
    async getAllCountEvents() {
        return await this.dashboardService.getAllCountEvents();
    }
};
__decorate([
    (0, decorators_1.Post)('/chart/users'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.DashboardYearDto]),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getAllCountUserByYear", null);
__decorate([
    (0, decorators_1.Post)('/chart/enterprises'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.DashboardYearDto]),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getAllCountEnterpriseByYear", null);
__decorate([
    (0, decorators_1.Post)('/chart/posts'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.DashboardYearDto]),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getAllCountPostByYear", null);
__decorate([
    (0, decorators_1.Post)('/chart/events'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.DashboardYearDto]),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getAllCountEventByYear", null);
__decorate([
    (0, decorators_1.Get)('/count/users'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getAllCountUsers", null);
__decorate([
    (0, decorators_1.Get)('/count/enterprises'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getAllCountEnterprises", null);
__decorate([
    (0, decorators_1.Get)('/count/posts'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getAllCountPosts", null);
__decorate([
    (0, decorators_1.Get)('/count/events'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getAllCountEvents", null);
DashboardController = __decorate([
    (0, common_1.Controller)('dashboard'),
    __metadata("design:paramtypes", [dashboard_service_1.DashboardService])
], DashboardController);
exports.DashboardController = DashboardController;
//# sourceMappingURL=dashboard.controller.js.map