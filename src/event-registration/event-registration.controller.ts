import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EventRegistrationDto } from './dto';
import { EventRegistrationService } from './event-registration.service';
import { EventRegistration } from './types';

@Controller('event-registration')
export class EventRegistrationController {
  constructor(private readonly eventRegistration: EventRegistrationService) {}

  @Post()
  async createEventRegistration(
    @Body() dto: EventRegistrationDto,
  ): Promise<EventRegistration> {
    return this.eventRegistration.createEventRegistration(dto);
  }

  @Get(':slug')
  async getEventRegistrationByEvent(@Param('slug') slug: string): Promise<EventRegistration[]>{
    return this.eventRegistration.getEventRegistrationByEvent(slug)
  }
}
