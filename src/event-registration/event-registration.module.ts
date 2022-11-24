import { Module } from '@nestjs/common';
import { MailService } from '../mailer/mailer.service';
import { EventRegistrationController } from './event-registration.controller';
import { EventRegistrationService } from './event-registration.service';

@Module({
  controllers: [EventRegistrationController],
  providers: [EventRegistrationService, MailService],
})
export class EventRegistrationModule {}
