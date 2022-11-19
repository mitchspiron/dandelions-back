import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EnterpriseDto } from './dto';
import { Enterprise } from './types';

@Injectable()
export class EnterpriseService {
  constructor(private readonly prisma: PrismaService) {}

  async createEnterprise(dto: EnterpriseDto): Promise<Enterprise> {
    const redacteur = await this.prisma.utilisateur.findUnique({
      where: {
        id: dto.idRedacteur,
      },
      include: {
        role_utilisateur: {
          select: {
            id: true,
          },
        },
      },
    });

    const redacteurExists = [1, 2].includes(redacteur?.role_utilisateur?.id);

    if (!redacteurExists) {
      throw new ForbiddenException("Le redacteur sélectionné n'éxiste pas");
    }

    const slug = dto.nom
      .toLocaleLowerCase()
      .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')
      .trim()
      .split(' ')
      .join('-');

    const slugExists = await this.prisma.article.findUnique({
      where: {
        slug,
      },
    });

    if (slugExists) {
      throw new ForbiddenException('Cet entreprise existe déjà!');
    }

    return await this.prisma.entreprise.create({
      data: {
        idRedacteur: dto.idRedacteur,
        illustration: dto.illustration,
        nom: dto.nom,
        slug,
        brand: dto.brand,
        email: dto.email,
        telephone: dto.telephone,
        anneeCreation: dto.anneeCreation,
        urlWebsite: dto.urlWebsite,
        descriptionA: dto.descriptionA,
        descriptionB: dto.descriptionB,
        textContact: dto.textContact,
      },
    });
  }

  async getEnterprise(): Promise<Enterprise[]> {
    const enterprises = await this.prisma.entreprise.findMany();

    if (!enterprises)
      throw new ForbiddenException("Il n'y a aucun entreprise!");
    return enterprises;
  }

  async getEnterpriseBySlug(slug: string): Promise<Enterprise> {
    const enterprise = await this.prisma.entreprise.findUnique({
      where: {
        slug,
      },
    });

    if (!enterprise)
      throw new ForbiddenException("L'identifiant n'existe pas!");
    return enterprise;
  }

  async updateEnterpriseBySlug(
    slug: string,
    dto: EnterpriseDto,
  ): Promise<Enterprise> {
    const enterprise = await this.prisma.entreprise.findUnique({
      where: {
        slug,
      },
    });

    if (!enterprise)
      throw new ForbiddenException("L'identifiant n'éxiste pas!");
    else {
      const slugTitle = dto.nom
        .toLocaleLowerCase()
        .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')
        .trim()
        .split(' ')
        .join('-');

      const slugExists = await this.prisma.entreprise.findUnique({
        where: {
          slug: slugTitle,
        },
      });

      if (slugExists && slugTitle !== slug) {
        throw new ForbiddenException('Cet entreprise existe déjà!');
      }

      return this.prisma.entreprise.update({
        data: {
          idRedacteur: dto.idRedacteur,
          illustration: dto.illustration,
          nom: dto.nom,
          slug: slugTitle,
          brand: dto.brand,
          email: dto.email,
          telephone: dto.telephone,
          anneeCreation: dto.anneeCreation,
          urlWebsite: dto.urlWebsite,
          descriptionA: dto.descriptionA,
          descriptionB: dto.descriptionB,
          textContact: dto.textContact,
        },
        where: {
          slug,
        },
      });
    }
  }

  async deleteEnterpriseBySlug(slug: string): Promise<Enterprise> {
    const enterpriseExists = await this.prisma.entreprise.findUnique({
      where: {
        slug,
      },
    });

    if (!enterpriseExists)
      throw new ForbiddenException("L'identifiant n'existe pas!");

    return await this.prisma.entreprise.delete({
      where: {
        slug,
      },
    });
  }
}
