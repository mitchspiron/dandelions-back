import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMailConfirmation(to, token) {
    return await this.mailerService.sendMail({
      to: to,
      from: 'mitchspiron@outlook.com',
      subject: 'CONFIRMATION INSCRIPTION DANDELIONS',
      html: `<p><a href="http://localhost:3000/auth-user/signup/confirm/${token}">CONFIRMER</a></p>`,
    });
  }
}
