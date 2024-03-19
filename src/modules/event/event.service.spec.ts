import { Test, TestingModule } from '@nestjs/testing';
import { EventService } from './event.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Event } from '../../models/event.entity';
import { CityService } from '../city/city.service';
import { City } from '../../models/city.entity';
import { Repository } from 'typeorm';

describe('EventService', () => {
  let service: EventService;
  let eventRepository: Repository<Event>;
  let cityRepository: Repository<City>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
      ],
    }).compile();

    service = module.get<EventService>(EventService);
    eventRepository = module.get<Repository<Event>>(getRepositoryToken(Event));
    cityRepository = module.get<Repository<City>>(getRepositoryToken(City));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all event', async () => {
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
        createDateTime: new Date('2024-03-18T01:51:36.000Z'),
        createdBy: 'system',
        lastChangedDateTime: new Date('2024-03-18T01:51:36.000Z'),
        lastChangedBy: null,
        internalComment: null,
      },
    ];

    // Mock the repository methods to return the mocked data
    jest.spyOn(eventRepository, 'findAndCount').mockResolvedValue([eventsData, eventsData.length]);
    jest.spyOn(cityRepository, 'findOne').mockImplementation(async () => citiesData);

    const result = await service.getAllEvent();
    expect(result.data).toEqual(eventsData);
    expect(result.totalCount).toBe(eventsData.length);
  })
});
