import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindManyOptions, Repository } from "typeorm";
import { Event } from "../../models/event.entity";
import { CityService } from "../city/city.service";
import { CreateEventDto } from "./dto/create-event.dto";

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event) private eventRepository: Repository<Event>,
    private cityService: CityService,
  ) {}

  // get all event with pagination
  public async getAllEvent(
    page?: number,
    limit?: number,
  ): Promise<{ data: Event[]; totalCount: number }> {
    const findOptions: FindManyOptions<Event> = {
      relations: ["city"],
      order: {
        createDateTime: "DESC",
      },
    };

    // Apply pagination if provided
    if (page && limit) {
      findOptions.skip = (page - 1) * limit;
      findOptions.take = limit;
    }

    const [events, totalCount] =
      await this.eventRepository.findAndCount(findOptions);

    return {
      data: events,
      totalCount,
    };
  }

  public async getById(id: string): Promise<Event> {
    const event = await this.eventRepository.findOne({
      relations: ["city"],
      where: {
        id,
      },
    });

    if (!event) {
      throw new HttpException("Event not found", HttpStatus.NOT_FOUND);
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
