import { EventRegistrationDto, FilterEventRegistrationDto } from './dto';
import { EventRegistrationService } from './event-registration.service';
import { EventRegistration } from './types';
export declare class EventRegistrationController {
    private readonly eventRegistration;
    constructor(eventRegistration: EventRegistrationService);
    createEventRegistration(dto: EventRegistrationDto): Promise<EventRegistration>;
    getEventRegistrationByEvent(slug: string): Promise<EventRegistration[]>;
    filterEventRegistrationByEvent(slug: string, dto: FilterEventRegistrationDto): Promise<EventRegistration[]>;
}
