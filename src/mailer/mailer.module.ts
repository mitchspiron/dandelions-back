//import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MailService } from './mailer.service';

@Module({
  imports: [
    /*MailerModule.forRoot({
      transport: {
        /* service: 'hotmail',
        secure: false,
        tls: true,
        auth: {
          user: 'mitchspiron@outlook.com',
          pass: 'Leomessi',
        },
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
      },
    }), */
  ],
  providers: [MailService],
})
export class MailModule {}
