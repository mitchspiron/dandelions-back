import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MailService } from './mailer.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        /* service: 'hotmail',
        secure: false,
        auth: {
          user: 'mitchspiron@outlook.com',
          pass: 'Leomessi',
        }, */
        /* host: 'smtp.mailtrap.io',
        port: 2525,
        auth: {
          user: '4859631f5e1c5c',
          pass: '9b15fa88e76a7c',
        }, */
        host: 'smtp-mail.outlook.com',
        secure: false,
        port: 587,
        tls: {
          ciphers: 'SSLV3',
        },
        auth: {
          user: 'mitchspiron@outlook.com',
          pass: 'Leomessi',
        },
      },
    }),
  ],
  controllers: [],
  providers: [MailService],
})
export class MailModule {}
