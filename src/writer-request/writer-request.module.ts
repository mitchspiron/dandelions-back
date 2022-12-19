import { Module } from '@nestjs/common';
import { MailService } from '../mailer/mailer.service';
import { WriterRequestController } from './writer-request.controller';
import { WriterRequestService } from './writer-request.service';

@Module({
  controllers: [WriterRequestController],
  providers: [WriterRequestService, MailService],
})
export class WriterRequestModule {}
