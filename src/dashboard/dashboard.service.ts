import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DashboardYearDto } from './dto';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getAllCountUserByYear(dto: DashboardYearDto) {
    const AllCountUserByYear = await this.prisma.$queryRaw`SELECT 
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

  async getAllCountEnterpriseByYear(dto: DashboardYearDto) {
    const AllCountEnterpriseByYear = await this.prisma.$queryRaw`SELECT 
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

  async getAllCountPostByYear(dto: DashboardYearDto) {
    const AllCountPostByYear = await this.prisma.$queryRaw`SELECT 
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

  async getAllCountEventByYear(dto: DashboardYearDto) {
    const AllCountEventByYear = await this.prisma.$queryRaw`SELECT 
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
}
