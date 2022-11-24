import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  EnterpriseDto,
  EnterpriseUpdateDto,
  isAbonneeDto,
  UpdateIllustrationDto,
} from './dto';
import { Enterprise, isAbonnee } from './types';
import * as fs from 'fs';

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
        abonnee: false,
      },
    });
  }

  async getEnterprise(): Promise<Enterprise[]> {
    const enterprises = await this.prisma.entreprise.findMany();

    if (!enterprises)
      throw new ForbiddenException("Il n'y a aucun entreprise!");
    return enterprises;
  }

  async getEnterpriseAdmin(id: number): Promise<Enterprise[]> {
    const redacteur = await this.prisma.utilisateur.findUnique({
      where: {
        id,
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
    } else if (redacteur?.role_utilisateur?.id == 1) {
      const enterprises = await this.prisma.entreprise.findMany();

      if (!enterprises)
        throw new ForbiddenException("Il n'y a aucun entreprise!");
      return enterprises;
    } else {
      const enterprises = await this.prisma.entreprise.findMany({
        where: {
          idRedacteur: id,
        },
      });

      if (!enterprises)
        throw new ForbiddenException("Il n'y a aucun entreprise!");
      return enterprises;
    }
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
    id: number,
    dto: EnterpriseUpdateDto,
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

      const redacteur = await this.prisma.utilisateur.findUnique({
        where: {
          id,
        },
        include: {
          role_utilisateur: {
            select: {
              id: true,
            },
          },
        },
      });

      if (
        enterprise.idRedacteur !== id &&
        redacteur?.role_utilisateur?.id !== 1
      ) {
        throw new ForbiddenException("Cette entreprise n'est pas la votre!");
      }

      return this.prisma.entreprise.update({
        data: {
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

  async updateIllustrationBySlug(
    slug: string,
    id: number,
    dto: UpdateIllustrationDto,
  ): Promise<Enterprise> {
    const enterpriseBySlug = await this.prisma.entreprise.findUnique({
      where: {
        slug,
      },
    });

    if (!enterpriseBySlug) {
      throw new ForbiddenException("Cet illustration d'article n'existe pas!");
    }

    if (fs.existsSync(`./images/${enterpriseBySlug.illustration}`)) {
      fs.unlinkSync(`./images/${enterpriseBySlug.illustration}`);
    }

    const redacteur = await this.prisma.utilisateur.findUnique({
      where: {
        id,
      },
      include: {
        role_utilisateur: {
          select: {
            id: true,
          },
        },
      },
    });

    if (
      enterpriseBySlug.idRedacteur !== id &&
      redacteur?.role_utilisateur?.id !== 1
    ) {
      throw new ForbiddenException("Cette entreprise n'est pas la votre!");
    }

    return await this.prisma.entreprise.update({
      data: {
        illustration: dto.illustration,
      },
      where: {
        slug,
      },
    });
  }

  async isAbonneeBySlug(slug: string, dto: isAbonneeDto): Promise<isAbonnee> {
    const enterpriseBySlug = await this.prisma.entreprise.findUnique({
      where: {
        slug,
      },
    });

    if (!enterpriseBySlug) {
      throw new ForbiddenException("Cette entreprise n'existe pas!");
    }

    return await this.prisma.entreprise.update({
      data: {
        abonnee: dto.abonnee,
      },
      where: {
        slug,
      },
      select: {
        id: true,
        abonnee: true,
      },
    });
  }

  async deleteEnterpriseBySlug(slug: string, id: number): Promise<Enterprise> {
    const enterpriseExists = await this.prisma.entreprise.findUnique({
      where: {
        slug,
      },
    });

    if (!enterpriseExists) {
      throw new ForbiddenException("L'identifiant n'existe pas!");
    }

    if (fs.existsSync(`./images/${enterpriseExists.illustration}`)) {
      fs.unlinkSync(`./images/${enterpriseExists.illustration}`);
    }

    const redacteur = await this.prisma.utilisateur.findUnique({
      where: {
        id,
      },
      include: {
        role_utilisateur: {
          select: {
            id: true,
          },
        },
      },
    });

    if (
      enterpriseExists.idRedacteur !== id &&
      redacteur?.role_utilisateur?.id !== 1
    ) {
      throw new ForbiddenException("Cette entreprise n'est pas la votre!");
    }

    return await this.prisma.entreprise.delete({
      where: {
        slug,
      },
    });
  }
}
