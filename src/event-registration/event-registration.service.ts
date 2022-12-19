import { ForbiddenException, Injectable } from '@nestjs/common';
import { MailService } from '../mailer/mailer.service';
import { PrismaService } from '../prisma/prisma.service';
import { EventRegistrationDto, FilterEventRegistrationDto } from './dto';
import { EventRegistration } from './types';

@Injectable()
export class EventRegistrationService {
  constructor(
    private readonly prisma: PrismaService,
    private mailService: MailService,
  ) {}

  async createEventRegistration(
    dto: EventRegistrationDto,
  ): Promise<EventRegistration> {
    const eventExist = await this.prisma.evenement.findUnique({
      where: {
        id: Number(dto.idEvenement),
      },
    });

    if (!eventExist) {
      throw new ForbiddenException("Cet evenement n'existe pas ou déja expiré");
    }
    const userExist = await this.prisma.utilisateur.findUnique({
      where: {
        id: Number(dto.idUtilisateur),
      },
    });

    if (!userExist) {
      throw new ForbiddenException("Cet utilisateur n'existe pas");
    }

    const userAlreadyRegistered =
      await this.prisma.inscription_evenement.findMany({
        where: {
          idUtilisateur: Number(dto.idUtilisateur),
          idEvenement: Number(dto.idEvenement),
        },
      });

    if (userAlreadyRegistered.length !== 0) {
      throw new ForbiddenException('Cet utilisateur est déja inscrit');
    }

    const event = await this.prisma.evenement.findUnique({
      where: {
        id: Number(dto.idEvenement),
      },
    });

    if (!event) {
      throw new ForbiddenException("Cet evenement n'existe pas ou déja expiré");
    }

    await this.mailService
      .sendMailEventRegistration(
        userExist.email,
        userExist.nom,
        userExist.prenom,
        event.titre,
        event.slug,
      )
      .then(() => console.log('Vérifier votre boîte email!'))
      .catch((e) => {
        console.log('mail', e);
        throw new ForbiddenException(
          "Un problème s'est produit, vérifier votre connexion internet!",
        );
      });

    return await this.prisma.inscription_evenement.create({
      data: {
        idUtilisateur: Number(dto.idUtilisateur),
        idEvenement: Number(dto.idEvenement),
      },
      select: {
        id: true,
        evenement: {
          select: {
            id: true,
            titre: true,
          },
        },
        utilisateur: {
          select: {
            id: true,
            nom: true,
            prenom: true,
            email: true,
            telephone: true,
          },
        },
      },
    });
  }

  async getEventRegistrationByEvent(
    slug: string,
  ): Promise<EventRegistration[]> {
    const eventExists = await this.prisma.evenement.findUnique({
      where: {
        slug,
      },
    });

    if (!eventExists) {
      throw new ForbiddenException("Cet evenement n'existe pas");
    }

    return await this.prisma.inscription_evenement.findMany({
      where: {
        idEvenement: Number(eventExists.id),
      },
      select: {
        id: true,
        evenement: {
          select: {
            id: true,
            titre: true,
          },
        },
        utilisateur: {
          select: {
            id: true,
            nom: true,
            prenom: true,
            email: true,
            telephone: true,
          },
        },
      },
    });
  }

  async filterEventRegistrationByEvent(
    slug: string,
    dto: FilterEventRegistrationDto,
  ): Promise<EventRegistration[]> {
    const eventExists = await this.prisma.evenement.findUnique({
      where: {
        slug,
      },
    });

    if (!eventExists) {
      throw new ForbiddenException("Cet evenement n'existe pas");
    }

    return await this.prisma.inscription_evenement.findMany({
      where: {
        idEvenement: Number(eventExists.id),
        OR: [
          {
            utilisateur: {
              nom: {
                contains: dto.searchkey,
              },
            },
          },
          {
            utilisateur: {
              prenom: {
                contains: dto.searchkey,
              },
            },
          },
        ],
      },
      select: {
        id: true,
        evenement: {
          select: {
            id: true,
            titre: true,
          },
        },
        utilisateur: {
          select: {
            id: true,
            nom: true,
            prenom: true,
            email: true,
            telephone: true,
          },
        },
      },
    });
  }
}
