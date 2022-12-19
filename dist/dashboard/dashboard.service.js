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
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let DashboardService = class DashboardService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAllCountUserByYear(dto) {
        const AllCountUserByYear = await this.prisma.$queryRaw `SELECT 
      JSON_ARRAY(
      SUM(CASE month(createdAt) WHEN 1 THEN 1 ELSE 0 END),
      SUM(CASE month(createdAt) WHEN 2 THEN 1 ELSE 0 END),
      SUM(CASE month(createdAt) WHEN 3 THEN 1 ELSE 0 END),
      SUM(CASE month(createdAt) WHEN 4 THEN 1 ELSE 0 END),
      SUM(CASE month(createdAt) WHEN 5 THEN 1 ELSE 0 END),
      SUM(CASE month(createdAt) WHEN 6 THEN 1 ELSE 0 END),
      SUM(CASE month(createdAt) WHEN 7 THEN 1 ELSE 0 END),
      SUM(CASE month(createdAt) WHEN 8 THEN 1 ELSE 0 END),
      SUM(CASE month(createdAt) WHEN 9 THEN 1 ELSE 0 END),
      SUM(CASE month(createdAt) WHEN 10 THEN 1 ELSE 0 END),
      SUM(CASE month(createdAt) WHEN 11 THEN 1 ELSE 0 END),
      SUM(CASE month(createdAt) WHEN 12 THEN 1 ELSE 0 END) ) as data
  FROM
  utilisateur WHERE year(createdAt) = ${dto.year}`;
        return AllCountUserByYear;
    }
    async getAllCountEnterpriseByYear(dto) {
        const AllCountEnterpriseByYear = await this.prisma.$queryRaw `SELECT 
      JSON_ARRAY(
      SUM(CASE month(createdAt) WHEN 1 THEN 1 ELSE 0 END),
      SUM(CASE month(createdAt) WHEN 2 THEN 1 ELSE 0 END),
      SUM(CASE month(createdAt) WHEN 3 THEN 1 ELSE 0 END),
      SUM(CASE month(createdAt) WHEN 4 THEN 1 ELSE 0 END),
      SUM(CASE month(createdAt) WHEN 5 THEN 1 ELSE 0 END),
      SUM(CASE month(createdAt) WHEN 6 THEN 1 ELSE 0 END),
      SUM(CASE month(createdAt) WHEN 7 THEN 1 ELSE 0 END),
      SUM(CASE month(createdAt) WHEN 8 THEN 1 ELSE 0 END),
      SUM(CASE month(createdAt) WHEN 9 THEN 1 ELSE 0 END),
      SUM(CASE month(createdAt) WHEN 10 THEN 1 ELSE 0 END),
      SUM(CASE month(createdAt) WHEN 11 THEN 1 ELSE 0 END),
      SUM(CASE month(createdAt) WHEN 12 THEN 1 ELSE 0 END) ) as data
  FROM
  entreprise WHERE year(createdAt) = ${dto.year}`;
        return AllCountEnterpriseByYear;
    }
    async getAllCountPostByYear(dto) {
        const AllCountPostByYear = await this.prisma.$queryRaw `SELECT 
      JSON_ARRAY(
      SUM(CASE month(createdAt) WHEN 1 THEN 1 ELSE 0 END),
      SUM(CASE month(createdAt) WHEN 2 THEN 1 ELSE 0 END),
      SUM(CASE month(createdAt) WHEN 3 THEN 1 ELSE 0 END),
      SUM(CASE month(createdAt) WHEN 4 THEN 1 ELSE 0 END),
      SUM(CASE month(createdAt) WHEN 5 THEN 1 ELSE 0 END),
      SUM(CASE month(createdAt) WHEN 6 THEN 1 ELSE 0 END),
      SUM(CASE month(createdAt) WHEN 7 THEN 1 ELSE 0 END),
      SUM(CASE month(createdAt) WHEN 8 THEN 1 ELSE 0 END),
      SUM(CASE month(createdAt) WHEN 9 THEN 1 ELSE 0 END),
      SUM(CASE month(createdAt) WHEN 10 THEN 1 ELSE 0 END),
      SUM(CASE month(createdAt) WHEN 11 THEN 1 ELSE 0 END),
      SUM(CASE month(createdAt) WHEN 12 THEN 1 ELSE 0 END) ) as data
  FROM
  article WHERE year(createdAt) = ${dto.year}`;
        return AllCountPostByYear;
    }
    async getAllCountEventByYear(dto) {
        const AllCountEventByYear = await this.prisma.$queryRaw `SELECT 
      JSON_ARRAY(
      SUM(CASE month(createdAt) WHEN 1 THEN 1 ELSE 0 END),
      SUM(CASE month(createdAt) WHEN 2 THEN 1 ELSE 0 END),
      SUM(CASE month(createdAt) WHEN 3 THEN 1 ELSE 0 END),
      SUM(CASE month(createdAt) WHEN 4 THEN 1 ELSE 0 END),
      SUM(CASE month(createdAt) WHEN 5 THEN 1 ELSE 0 END),
      SUM(CASE month(createdAt) WHEN 6 THEN 1 ELSE 0 END),
      SUM(CASE month(createdAt) WHEN 7 THEN 1 ELSE 0 END),
      SUM(CASE month(createdAt) WHEN 8 THEN 1 ELSE 0 END),
      SUM(CASE month(createdAt) WHEN 9 THEN 1 ELSE 0 END),
      SUM(CASE month(createdAt) WHEN 10 THEN 1 ELSE 0 END),
      SUM(CASE month(createdAt) WHEN 11 THEN 1 ELSE 0 END),
      SUM(CASE month(createdAt) WHEN 12 THEN 1 ELSE 0 END) ) as data
  FROM
  evenement WHERE year(createdAt) = ${dto.year}`;
        return AllCountEventByYear;
    }
    async getAllCountUsers() {
        const AllCountUsers = await this.prisma.utilisateur.count();
        return AllCountUsers;
    }
    async getAllCountEnterprises() {
        const AllCountEnterprises = await this.prisma.entreprise.count();
        return AllCountEnterprises;
    }
    async getAllCountPosts() {
        const AllCountPosts = await this.prisma.article.count();
        return AllCountPosts;
    }
    async getAllCountEvents() {
        const AllCountEvents = await this.prisma.evenement.count();
        return AllCountEvents;
    }
};
DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DashboardService);
exports.DashboardService = DashboardService;
//# sourceMappingURL=dashboard.service.js.map