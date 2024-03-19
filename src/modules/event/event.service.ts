import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from '../../models/event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { CityService } from '../city/city.service';

@Injectable()
export class EventService {
    constructor(
        @InjectRepository(Event) private eventRepository: Repository<Event>,
        private cityService: CityService
    ) {}

    // get all event with pagination
    public async getAllEvent(page = 1, limit = 10): Promise<({data: Event[], totalCount:number})> {
        const [events, totalCount] = await this.eventRepository.findAndCount({
            relations: ['city'],
            take: limit,
            skip: (page - 1) * limit,
            order: {
                createDateTime: 'DESC'
            }
        });
        
        return {
            data: events,
            totalCount
        };
    }

    public async getById(id: string): Promise<Event> {
        const event = await this.eventRepository.findOne({
            relations: ['city'],
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
        const city = await this.cityService.getById(data.cityId);
        const event = this.eventRepository.create(data);
        event.city = city;
        await this.eventRepository.save(event);
        return event;
    }
}
