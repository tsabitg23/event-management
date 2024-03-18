import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from 'src/models/event.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EventService {
    constructor(@InjectRepository(Event) private eventRepository: Repository<Event>) {}

}
