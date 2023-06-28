import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MailController } from './mailer.controller';
import { MailService } from './mailer.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        /* service: 'hotmail',
        secure: false,
        tls: true,
        auth: {
          user: 'mitchspiro',
          pass: 'xxxxxxxxxxx',
        }, */
        /* host: 'smtp-mail.outlook.com',
        secureConnection: false,
        port: 587,
        tls: {
          ciphers: 'SSLv3',
        },
        auth: {
          user: 'mitchspiron',
          pass: 'XXXXXXXXXXXX',
        }, */
        service: 'gmail',
        secure: false,
        tls: true,
        auth: {
          user: 'mitchspiron',
          pass: 'lxzxhwdvrocaykcx',
        },
      },
    }),
  ],
  controllers: [MailController],
  exports: [MailService],
  providers: [MailService],
})
export class MailModule {}
