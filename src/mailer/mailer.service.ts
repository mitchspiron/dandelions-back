import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { confirmationTemplate } from './templates/confirmation';
//import { forgotTemplate } from './templates/forgot';
import { eventRegistrationTemplate } from './templates/event-registration';
import { acceptWriterRequestTemplate } from './templates/accept-writer-request';
import { declineWriterRequestTemplate } from './templates/decline-writer-request';

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

  /*   async sendMailForgotPassword(to, token) {
    const html = forgotTemplate(token);

    return await this.mailerService.sendMail({
      to: to,
      from: 'mitchspiron@outlook.com',
      subject: 'RECUPERATION MOT DE PASSE - DANDELIONS',
      html,
    });
  } */

  async sendMailForgotPassword(to, token) {
    return await this.mailerService.sendMail({
      to: to,
      from: 'mitchspiron@outlook.com',
      subject: 'RECUPERATION MOT DE PASSE - DANDELIONS',
      html: `<p>${token}</p>`,
    });
  }

  async sendMailEventRegistration(to, nom, prenom, event, slug) {
    const html = eventRegistrationTemplate(nom, prenom, event, slug);
    return await this.mailerService.sendMail({
      to: to,
      from: 'mitchspiron@outlook.com',
      subject: 'INSCRIPTION COMING-SOON - DANDELIONS',
      html,
    });
  }

  async sendMailAcceptWriterRequest(to, nom, prenom) {
    const html = acceptWriterRequestTemplate(nom, prenom);
    return await this.mailerService.sendMail({
      to: to,
      from: 'mitchspiron@outlook.com',
      subject: 'DANDELIONS - DEMANDE REDACTION ACCEPTEE',
      html,
    });
  }

  async sendMailDeclineWriterRequest(to, nom, prenom) {
    const html = declineWriterRequestTemplate(nom, prenom);
    return await this.mailerService.sendMail({
      to: to,
      from: 'mitchspiron@outlook.com',
      subject: 'DANDELIONS - DEMANDE REDACTION REFUSEE',
      html,
    });
  }

  /* 
  transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    secureConnection: false,
    port: 587,
    tls: {
      ciphers: 'SSLv3',
    },
    auth: {
      user: 'mitchspiron@outlook.com',
      pass: 'Leomessi',
    },
  });

  async sendMailConfirmation(to, token) {
    const html = confirmationTemplate(token);

    return await this.transporter.sendMail({
      to: to,
      from: 'mitchspiron@outlook.com',
      subject: 'CONFIRMATION INSCRIPTION - DANDELIONS',
      html,
    });
  }

  async sendMailForgotPassword(to, token) {
    const html = forgotTemplate(token);

    return await this.transporter.sendMail({
      to: to,
      from: 'mitchspiron@outlook.com',
      subject: 'RECUPERATION MOT DE PASSE - DANDELIONS',
      html,
    });
  }

  async sendMailEventRegistration(to, nom, prenom, event, slug) {
    const html = eventRegistrationTemplate(nom, prenom, event, slug);
    return await this.transporter.sendMail({
      to: to,
      from: 'mitchspiron@outlook.com',
      subject: 'INSCRIPTION COMING-SOON - DANDELIONS',
      html,
    });
  }

  async sendMailAcceptWriterRequest(to, nom, prenom) {
    const html = acceptWriterRequestTemplate(nom, prenom);
    return await this.transporter.sendMail({
      to: to,
      from: 'mitchspiron@outlook.com',
      subject: 'DANDELIONS - DEMANDE REDACTION ACCEPTEE',
      html,
    });
  }

  async sendMailDeclineWriterRequest(to, nom, prenom) {
    const html = declineWriterRequestTemplate(nom, prenom);
    return await this.transporter.sendMail({
      to: to,
      from: 'mitchspiron@outlook.com',
      subject: 'DANDELIONS - DEMANDE REDACTION REFUSEE',
      html,
    });
  }
  */
}
