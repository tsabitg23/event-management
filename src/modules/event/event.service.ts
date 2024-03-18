import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from 'src/models/event.entity';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dto/create_event.dto';
import { CityService } from '../city/city.service';

@Injectable()
export class EventService {
    constructor(
        @InjectRepository(Event) private eventRepository: Repository<Event>,
        private cityService: CityService
    ) {}

    // get all event with pagination
    public async getAllEvent(page = 1, limit = 10): Promise<Event[]> {
        const events = await this.eventRepository.find({
            take: limit,
            skip: (page - 1) * limit
        });

        return events;
    }

    public async getById(id: string): Promise<Event> {
        const event = await this.eventRepository.findOne({
            where: {
                id
            }
        });

        if (!event) {
            throw new HttpException('Event not found', HttpStatus.NOT_FOUND);
        }

        return event;
    }

    // create new data
    public async createEvent(data: CreateEventDto): Promise<Event> {
        // check cityId is exist 
        await this.cityService.getById(data.cityId);
        
        const event = this.eventRepository.create(data);
        await this.eventRepository.save(event);
        return event;
    }
}
