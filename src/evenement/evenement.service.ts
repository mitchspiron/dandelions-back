import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateEvenementDto,
  UpdateEvenementDto,
  UpdateIllustrationDto,
} from './dto';
import { CreateEvenement, GetEvenement } from './types';
import * as fs from 'fs';

@Injectable()
export class EvenementService {
  constructor(private readonly prisma: PrismaService) {}

  async createEvenement(dto: CreateEvenementDto): Promise<CreateEvenement> {
    const entrepriseById = await this.prisma.entreprise.findUnique({
      where: {
        id: dto.idEntreprise,
      },
      include: {
        utilisateur: {
          select: {
            id: true,
            role_utilisateur: {
              select: {
                id: true,
              },
            },
          },
        },
      },
    });

    const redacteurExist = [1, 2].includes(
      entrepriseById?.utilisateur?.role_utilisateur?.id,
    );

    if (!redacteurExist) {
      throw new ForbiddenException(
        "Le redacteur de l'entreprise sélectionné n'éxiste pas",
      );
    }

    const slug = dto.titre
      .toLocaleLowerCase()
      .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')
      .trim()
      .split(' ')
      .join('-');

    const evenementBySlug = await this.prisma.article.findUnique({
      where: {
        slug,
      },
    });

    if (evenementBySlug) {
      throw new ForbiddenException('Cet evenement existe déja');
    }

    return this.prisma.evenement.create({
      data: {
        idEntreprise: dto.idEntreprise,
        titre: dto.titre,
        slug,
        description: dto.description,
        illustration: dto.illustration,
        contenu: dto.contenu,
        deadline: dto.deadline,
        onHeader: false,
        onSubscribe: dto.onSubscribe,
      },
    });
  }

  async getEvenement(): Promise<GetEvenement[]> {
    const evenement = await this.prisma.evenement.findMany({
      select: {
        id: true,
        idEntreprise: true,
        titre: true,
        slug: true,
        illustration: true,
        description: true,
        contenu: true,
        deadline: true,
        onHeader: true,
        createdAt: true,
        onSubscribe: true,
        inscription_evenement: {
          select: {
            id: true,
            idUtilisateur: true,
          },
        },
      },
    });

    if (!evenement) {
      throw new ForbiddenException("Il n'y a aucun article!");
    }

    return evenement;
  }

  async getEvenementBySlug(slug: string): Promise<GetEvenement> {
    const evenementBySlug = await this.prisma.evenement.findUnique({
      where: {
        slug,
      },
      select: {
        id: true,
        idEntreprise: true,
        titre: true,
        slug: true,
        illustration: true,
        description: true,
        contenu: true,
        deadline: true,
        onHeader: true,
        createdAt: true,
        onSubscribe: true,
        inscription_evenement: {
          select: {
            id: true,
            idUtilisateur: true,
          },
        },
      },
    });

    if (!evenementBySlug) {
      throw new ForbiddenException("Cet evenement n'existe pas!");
    }

    return evenementBySlug;
  }

  async updateEvenementBySlug(
    slug: string,
    dto: UpdateEvenementDto,
  ): Promise<CreateEvenement> {
    const evenementExists = await this.prisma.evenement.findUnique({
      where: {
        slug,
      },
    });

    if (!evenementExists) {
      throw new ForbiddenException("Cet evenement n'existe pas!");
    }

    const updatedSlug = dto.titre
      .toLocaleLowerCase()
      .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')
      .trim()
      .split(' ')
      .join('-');

    const titreEvenementExist = await this.prisma.evenement.findUnique({
      where: {
        slug: updatedSlug,
      },
    });

    if (titreEvenementExist && slug !== updatedSlug) {
      throw new ForbiddenException("Ce titre d'évenement existe déja!");
    }

    return await this.prisma.evenement.update({
      data: {
        titre: dto.titre,
        description: dto.description,
        contenu: dto.contenu,
        deadline: dto.deadline,
        slug: updatedSlug,
        onSubscribe: dto.onSubscribe,
      },
      where: {
        slug,
      },
    });
  }

  async updateIllustrationBySlug(
    slug: string,
    dto: UpdateIllustrationDto,
  ): Promise<CreateEvenement> {
    const evenementBySlug = await this.prisma.evenement.findUnique({
      where: {
        slug,
      },
    });

    if (!evenementBySlug) {
      throw new ForbiddenException(
        "Cet illustration d'evenement n'existe pas!",
      );
    }

    if (fs.existsSync(`./images/${evenementBySlug.illustration}`)) {
      fs.unlinkSync(`./images/${evenementBySlug.illustration}`);
    }

    return await this.prisma.evenement.update({
      data: {
        illustration: dto.illustration,
      },
      where: {
        slug,
      },
    });
  }

  async deleteEvenementBySlug(slug: string): Promise<CreateEvenement> {
    const evenementBySlug = await this.prisma.evenement.findUnique({
      where: {
        slug,
      },
    });

    if (!evenementBySlug) {
      throw new ForbiddenException("Cet evenement n'existe pas!");
    }

    if (fs.existsSync(`./images/${evenementBySlug.illustration}`)) {
      fs.unlinkSync(`./images/${evenementBySlug.illustration}`);
    }

    return await this.prisma.evenement.delete({
      where: {
        slug,
      },
    });
  }
}
