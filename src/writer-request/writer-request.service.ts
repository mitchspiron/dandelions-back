import { ForbiddenException, Injectable } from '@nestjs/common';
import { MailService } from '../mailer/mailer.service';
import { PrismaService } from '../prisma/prisma.service';
import { WriterRequestDto } from './dto';
import { WriterRequest } from './types';

@Injectable()
export class WriterRequestService {
  constructor(
    private readonly prisma: PrismaService,
    private mailService: MailService,
  ) {}

  async createWriterRequest(dto: WriterRequestDto): Promise<WriterRequest> {
    const userExist = await this.prisma.utilisateur.findUnique({
      where: {
        id: Number(dto.idUtilisateur),
      },
    });

    if (!userExist) {
      throw new ForbiddenException("Cet utilisateur n'existe pas");
    }

    const writerExist = await this.prisma.utilisateur.findMany({
      where: {
        id: Number(dto.idUtilisateur),
        OR: [
          {
            role: 1,
          },
          {
            role: 2,
          },
        ],
      },
    });

    if (writerExist.length !== 0) {
      throw new ForbiddenException('Vous êtes déjà un rédacteur');
    }

    const userAlreadySendRequest = await this.prisma.demande_redacteur.findMany(
      {
        where: {
          idUtilisateur: Number(dto.idUtilisateur),
        },
      },
    );

    if (userAlreadySendRequest.length !== 0) {
      throw new ForbiddenException('Vous avez déjà envoyé votre demande');
    }

    return await this.prisma.demande_redacteur.create({
      data: {
        idUtilisateur: Number(dto.idUtilisateur),
        acceptee: false,
      },
      select: {
        id: true,
        utilisateur: {
          select: {
            id: true,
            nom: true,
            prenom: true,
            email: true,
            telephone: true,
          },
        },
        acceptee: true,
      },
    });
  }

  async getWriterRequest(): Promise<WriterRequest[]> {
    const writerRequest = await this.prisma.demande_redacteur.findMany({
      select: {
        id: true,
        utilisateur: {
          select: {
            id: true,
            nom: true,
            prenom: true,
            email: true,
            telephone: true,
          },
        },
        acceptee: true,
      },
    });

    if (!writerRequest) {
      throw new ForbiddenException("Il n'y a aucune demande!");
    }

    return writerRequest;
  }

  async acceptWriterRequest(id: number, user: number) {
    const userExist = await this.prisma.utilisateur.findUnique({
      where: {
        id: user,
      },
    });

    if (!userExist) {
      throw new ForbiddenException("Cet utilisateur n'existe pas");
    }

    const writerRequestExist = await this.prisma.demande_redacteur.findUnique({
      where: {
        id,
      },
    });

    if (!writerRequestExist) {
      throw new ForbiddenException("Cet demande n'existe pas!");
    } else {
      const accepted = await this.prisma.utilisateur.update({
        data: {
          role: 2,
        },
        where: {
          id: user,
        },
        select: {
          id: true,
          email: true,
          nom: true,
          prenom: true,
        },
      });

      if (accepted) {
        await this.mailService
          .sendMailAcceptWriterRequest(
            accepted.email,
            accepted.nom,
            accepted.prenom,
          )
          .then(() => console.log('Vérifier votre boîte email!'))
          .catch((e) => {
            console.log('mail', e);
            throw new ForbiddenException(
              "Un problème s'est produit, vérifier votre connexion internet!",
            );
          });

        return await this.prisma.demande_redacteur.delete({
          where: {
            id,
          },
        });
      }

      return accepted;
    }
  }

  async declineWriterRequest(id: number): Promise<WriterRequest> {
    const writerRequestExist = await this.prisma.demande_redacteur.findUnique({
      where: {
        id,
      },
    });

    if (!writerRequestExist) {
      throw new ForbiddenException("Cet demande n'existe pas!");
    } else {
      const refused = await this.prisma.demande_redacteur.delete({
        where: {
          id,
        },
        select: {
          id: true,
          utilisateur: {
            select: {
              id: true,
              nom: true,
              prenom: true,
              email: true,
              telephone: true,
            },
          },
          acceptee: true,
        },
      });

      await this.mailService
        .sendMailDeclineWriterRequest(
          refused.utilisateur.email,
          refused.utilisateur.nom,
          refused.utilisateur.prenom,
        )
        .then(() => console.log('Vérifier votre boîte email!'))
        .catch((e) => {
          console.log('mail', e);
          throw new ForbiddenException(
            "Un problème s'est produit, vérifier votre connexion internet!",
          );
        });

      return refused;
    }
  }
}
