import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EventRegistrationDto } from './dto';
import { EventRegistration } from './types';

@Injectable()
export class EventRegistrationService {
  constructor(private readonly prisma: PrismaService) {}

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
    } else {
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
          },
        });

      if (userAlreadyRegistered.length !== 0) {
        throw new ForbiddenException('Cet utilisateur est déja inscrit');
      }
    }
    return await this.prisma.inscription_evenement.create({
      data: {
        idUtilisateur: Number(dto.idUtilisateur),
        idEvenement: Number(dto.idEvenement),
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
    });
  }
}
