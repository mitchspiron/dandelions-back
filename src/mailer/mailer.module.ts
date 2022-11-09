import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MailService } from './mailer.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        service: 'hotmail',
        secure: false,
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
