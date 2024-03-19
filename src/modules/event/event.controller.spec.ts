import { Test, TestingModule } from '@nestjs/testing';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Event } from '../../models/event.entity';
import { City } from '../../models/city.entity';
import { CityService } from '../city/city.service';
import { CreateEventDto } from './dto/create-event.dto';

 // Mock data for cities
 const citiesData: City = {
  id: 'bbc16ea5-5a52-46fc-82b2-ed8aee0abc77',
  name: 'Jakarta',
  country: 'Indonesia',
  isActive: true,
  isArchived: false,
  createDateTime: new Date('2024-03-18T01:51:36.000Z'),
  createdBy: 'system',
  lastChangedDateTime: new Date('2024-03-18T01:51:36.000Z'),
  lastChangedBy: null,
  internalComment: null,
}

const eventsData: Event[] = [
  {
    id: '2f456a32-ef08-4bdf-b812-9cf0008cf2ad',
    name: 'Band Concert',
    price: 1000,
    city: citiesData,
    isActive: true,
    isArchived: false,
    createDateTime: new Date('2024-03-18T01:51:35.000Z'),
    createdBy: 'system',
    lastChangedDateTime: new Date('2024-03-18T01:51:36.000Z'),
    lastChangedBy: null,
    internalComment: null,
  },
  {
    id: '9b994e74-09fb-43f9-a91c-89c30bde5f62',
    name: 'Band Concert 2',
    price: 1000,
    city: citiesData,
    isActive: true,
    isArchived: false,
    createDateTime: new Date('2024-03-18T01:51:36.000Z'),
    createdBy: 'system',
    lastChangedDateTime: new Date('2024-03-18T01:51:36.000Z'),
    lastChangedBy: null,
    internalComment: null,
  },
];

describe('EventController', () => {
  let controller: EventController;
  let service: EventService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventController],
      providers: [
        EventService,
        CityService,
        {
          provide: getRepositoryToken(Event),
          useClass: Repository
        },
        {
          provide: getRepositoryToken(City),
          useClass: Repository
        }
      ]
    }).compile();

    controller = module.get<EventController>(EventController);
    service = module.get<EventService>(EventService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  it('should get all event', async () => {
    const result = {
      data: eventsData,
      totalCount: 1
    };
    jest.spyOn(service, 'getAllEvent').mockResolvedValue(result);

    expect(await controller.getAllEvent(1, 10)).toBe(result);
  });

  it('should get event by id', async () => {
    jest.spyOn(service, 'getById').mockResolvedValue(eventsData[0]);

    const selectedEvent = await controller.getById(eventsData[0].id);
    expect(selectedEvent).toStrictEqual({data: eventsData[0]});
  });

  it('should return error if event not found', async () => {
    jest.spyOn(controller, 'getById').mockRejectedValue(new Error('Event not found'));
    try {
      await controller.getById('2f456a32-ef08-4bdf-b812-9cf0008cf2ad');
    } catch (error) {
      expect(error.message).toBe('Event not found');
    }
  });

  it('should create event', async () => {
    const result = {
      message: "success",
      data: eventsData[0]
    };
    jest.spyOn(service, 'createEvent').mockResolvedValue(eventsData[0]);

    const inputEvent = new CreateEventDto();
    inputEvent.name = 'Band Concert';
    inputEvent.price = 1000;
    inputEvent.cityId = citiesData.id;
    const createEvent = await controller.createEvent(inputEvent);
    expect(createEvent).toStrictEqual(result);
  });
});
