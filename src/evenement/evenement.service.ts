import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateEvenementDto,
  FilterEvenementDto,
  SwitchOnHeaderDto,
  SwitchOnSubscribeDto,
  UpdateEvenementDto,
  UpdateIllustrationDto,
} from './dto';
import {
  CreateEvenement,
  GetEvenement,
  SwitchOnHeader,
  SwitchOnSubscribe,
} from './types';
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
        deadline: new Date(dto.deadline),
        onHeader: false,
        onSubscribe: dto.onSubscribe,
      },
    });
  }

  async getEvenement(): Promise<GetEvenement[]> {
    const evenement = await this.prisma.evenement.findMany({
      orderBy: {
        id: 'desc',
      },
      select: {
        id: true,
        entreprise: {
          select: {
            id: true,
            nom: true,
            illustration: true,
            slug: true,
            descriptionA: true,
          },
        },
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
      throw new ForbiddenException("Il n'y a aucun évenement!");
    }

    return evenement;
  }

  async getEvenementOnHeader(): Promise<GetEvenement[]> {
    const evenement = await this.prisma.evenement.findMany({
      orderBy: {
        id: 'desc',
      },
      where: {
        onHeader: true,
      },
      select: {
        id: true,
        entreprise: {
          select: {
            id: true,
            nom: true,
            illustration: true,
            slug: true,
            descriptionA: true,
          },
        },
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
      throw new ForbiddenException("Il n'y a aucun évenement!");
    }

    return evenement;
  }

  async filterEvenement(dto: FilterEvenementDto): Promise<GetEvenement[]> {
    const evenement = await this.prisma.evenement.findMany({
      orderBy: {
        id: 'desc',
      },
      where: {
        OR: [
          {
            titre: {
              contains: dto.searchkey,
            },
          },
          {
            description: {
              contains: dto.searchkey,
            },
          },
          {
            contenu: {
              contains: dto.searchkey,
            },
          },
        ],
      },
      select: {
        id: true,
        entreprise: {
          select: {
            id: true,
            nom: true,
            illustration: true,
            slug: true,
            descriptionA: true,
          },
        },
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
      throw new ForbiddenException("Il n'y a aucun évenement!");
    }

    return evenement;
  }

  async getFourLastEvenement(): Promise<GetEvenement[]> {
    const evenement = await this.prisma.evenement.findMany({
      orderBy: {
        id: 'desc',
      },
      take: 4,
      select: {
        id: true,
        entreprise: {
          select: {
            id: true,
            nom: true,
            illustration: true,
            slug: true,
            descriptionA: true,
          },
        },
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
      throw new ForbiddenException("Il n'y a aucun évenement!");
    }

    return evenement;
  }

  async getEvenementAdmin(id: number): Promise<GetEvenement[]> {
    const user = await this.prisma.utilisateur.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!user) {
      throw new ForbiddenException("L'utilisateur sélectionné n'éxiste pas");
    } else if (user.role !== 1) {
      const evenement = await this.prisma.evenement.findMany({
        orderBy: {
          id: 'desc',
        },
        where: {
          entreprise: {
            utilisateur: {
              id: Number(id),
            },
          },
        },
        select: {
          id: true,
          entreprise: {
            select: {
              id: true,
              nom: true,
              illustration: true,
              slug: true,
              descriptionA: true,
            },
          },
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
        throw new ForbiddenException("Il n'y a aucun évenement!");
      }

      return evenement;
    }

    const evenement = await this.prisma.evenement.findMany({
      orderBy: {
        id: 'desc',
      },
      select: {
        id: true,
        entreprise: {
          select: {
            id: true,
            nom: true,
            illustration: true,
            slug: true,
            descriptionA: true,
          },
        },
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
      throw new ForbiddenException("Il n'y a aucun évenement!");
    }

    return evenement;
  }

  async filterEvenementAdmin(
    id: number,
    dto: FilterEvenementDto,
  ): Promise<GetEvenement[]> {
    const user = await this.prisma.utilisateur.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!user) {
      throw new ForbiddenException("L'utilisateur sélectionné n'éxiste pas");
    } else if (user.role !== 1) {
      const evenement = await this.prisma.evenement.findMany({
        orderBy: {
          id: 'desc',
        },
        where: {
          entreprise: {
            utilisateur: {
              id: Number(id),
            },
          },
          titre: {
            contains: dto.searchkey,
          },
        },
        select: {
          id: true,
          entreprise: {
            select: {
              id: true,
              nom: true,
              illustration: true,
              slug: true,
              descriptionA: true,
            },
          },
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
        throw new ForbiddenException("Il n'y a aucun évenement!");
      }

      return evenement;
    }

    const evenement = await this.prisma.evenement.findMany({
      orderBy: {
        id: 'desc',
      },
      where: {
        titre: {
          contains: dto.searchkey,
        },
      },
      select: {
        id: true,
        entreprise: {
          select: {
            id: true,
            nom: true,
            illustration: true,
            slug: true,
            descriptionA: true,
          },
        },
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
      throw new ForbiddenException("Il n'y a aucun évenement!");
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
        entreprise: {
          select: {
            id: true,
            nom: true,
            illustration: true,
            slug: true,
            descriptionA: true,
          },
        },
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
    id: number,
    dto: UpdateEvenementDto,
  ): Promise<CreateEvenement> {
    const evenementExists = await this.prisma.evenement.findUnique({
      where: {
        slug,
      },
      include: {
        entreprise: {
          include: {
            utilisateur: true,
          },
        },
      },
    });

    if (!evenementExists) {
      throw new ForbiddenException("Cet evenement n'existe pas!");
    } else {
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
        evenementExists.entreprise.utilisateur.id !== id &&
        redacteur?.role_utilisateur?.id !== 1
      ) {
        throw new ForbiddenException("Cet évènement n'est pas le votre!");
      }

      return await this.prisma.evenement.update({
        data: {
          titre: dto.titre,
          description: dto.description,
          contenu: dto.contenu,
          deadline: new Date(dto.deadline),
          slug: updatedSlug,
          onSubscribe: dto.onSubscribe,
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
  ): Promise<CreateEvenement> {
    const evenementBySlug = await this.prisma.evenement.findUnique({
      where: {
        slug,
      },
      include: {
        entreprise: {
          include: {
            utilisateur: true,
          },
        },
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
      evenementBySlug.entreprise.idRedacteur !== id &&
      redacteur?.role_utilisateur?.id !== 1
    ) {
      throw new ForbiddenException("Cet évènement n'est pas le votre!");
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

  async deleteEvenementBySlug(
    slug: string,
    id: number,
  ): Promise<CreateEvenement> {
    const evenementBySlug = await this.prisma.evenement.findUnique({
      where: {
        slug,
      },
      include: {
        entreprise: {
          include: {
            utilisateur: true,
          },
        },
      },
    });

    if (!evenementBySlug) {
      throw new ForbiddenException("Cet evenement n'existe pas!");
    }

    if (fs.existsSync(`./images/${evenementBySlug.illustration}`)) {
      fs.unlinkSync(`./images/${evenementBySlug.illustration}`);
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
      evenementBySlug.entreprise.idRedacteur !== id &&
      redacteur?.role_utilisateur?.id !== 1
    ) {
      throw new ForbiddenException("Cet évènement n'est pas le votre!");
    }

    return await this.prisma.evenement.delete({
      where: {
        slug,
      },
    });
  }

  async switchOnHeaderBySlug(
    slug: string,
    dto: SwitchOnHeaderDto,
  ): Promise<SwitchOnHeader> {
    const eventBySlug = await this.prisma.evenement.findUnique({
      where: {
        slug,
      },
    });

    if (!eventBySlug) {
      throw new ForbiddenException("Cet évenement n'existe pas!");
    }

    return await this.prisma.evenement.update({
      data: {
        onHeader: dto.onHeader,
      },
      where: {
        slug,
      },
      select: {
        id: true,
        onHeader: true,
      },
    });
  }

  async switchOnSubscribeBySlug(
    slug: string,
    dto: SwitchOnSubscribeDto,
  ): Promise<SwitchOnSubscribe> {
    const eventBySlug = await this.prisma.evenement.findUnique({
      where: {
        slug,
      },
    });

    if (!eventBySlug) {
      throw new ForbiddenException("Cet évenement n'existe pas!");
    }

    return await this.prisma.evenement.update({
      data: {
        onSubscribe: dto.onSubscribe,
      },
      where: {
        slug,
      },
      select: {
        id: true,
        onSubscribe: true,
      },
    });
  }
}
