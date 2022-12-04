import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { confirmationTemplate } from './templates/confirmation';
import { forgotTemplate } from './templates/forgot';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMailConfirmation(to, token) {
    const html = confirmationTemplate(token);

    return await this.mailerService.sendMail({
      to: to,
      from: 'mitchspiron@outlook.com',
      subject: 'CONFIRMATION INSCRIPTION - DANDELIONS',
      html,
    });
  }

  async sendMailForgotPassword(to, token) {
    const html = forgotTemplate(token);

    return await this.mailerService.sendMail({
      to: to,
      from: 'mitchspiron@outlook.com',
      subject: 'RECUPERATION MOT DE PASSE - DANDELIONS',
      html,
    });
  }

  async sendMailEventRegistration(to, nom, prenom, event) {
    return await this.mailerService.sendMail({
      to: to,
      from: 'mitchspiron@outlook.com',
      subject: 'INSCRIPTION COMING-SOON - DANDELIONS',
      html: `
        <p>Hello ${prenom} ${nom},</p>
        <p>Votre inscription au coming-soon <h4>${event}</h4> a bien été enregistré.</p>
      `,
    });
  }
}
