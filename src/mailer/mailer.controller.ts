import { Body, Controller } from '@nestjs/common';
import { Post } from '@nestjs/common/decorators';
import { Public } from '../common/decorators';
import { ContactDto } from './dto';
import { MailService } from './mailer.service';

@Controller('mailer')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Public()
  @Post('/contact')
  async sendMailContact(@Body() dto: ContactDto) {
    return await this.mailService.sendMailContact(dto);
  }
}
