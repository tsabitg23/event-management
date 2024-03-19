import { Test, TestingModule } from "@nestjs/testing";
import { EventService } from "./event.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Event } from "../../models/event.entity";
import { CityService } from "../city/city.service";
import { City } from "../../models/city.entity";
import { Repository } from "typeorm";

// Mock data
// Mock data for cities
const citiesData: City = {
  id: "bbc16ea5-5a52-46fc-82b2-ed8aee0abc77",
  name: "Jakarta",
  country: "Indonesia",
  isActive: true,
  isArchived: false,
  createDateTime: new Date("2024-03-18T01:51:36.000Z"),
  createdBy: "system",
  lastChangedDateTime: new Date("2024-03-18T01:51:36.000Z"),
  lastChangedBy: null,
  internalComment: null,
};

const eventsData: Event[] = [
  {
    id: "2f456a32-ef08-4bdf-b812-9cf0008cf2ad",
    name: "Band Concert",
    price: 1000,
    city: citiesData,
    isActive: true,
    isArchived: false,
    createDateTime: new Date("2024-03-18T01:51:35.000Z"),
    createdBy: "system",
    lastChangedDateTime: new Date("2024-03-18T01:51:36.000Z"),
    lastChangedBy: null,
    internalComment: null,
  },
  {
    id: "9b994e74-09fb-43f9-a91c-89c30bde5f62",
    name: "Band Concert 2",
    price: 1000,
    city: citiesData,
    isActive: true,
    isArchived: false,
    createDateTime: new Date("2024-03-18T01:51:36.000Z"),
    createdBy: "system",
    lastChangedDateTime: new Date("2024-03-18T01:51:36.000Z"),
    lastChangedBy: null,
    internalComment: null,
  },
];

describe("EventService", () => {
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
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(City),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<EventService>(EventService);
    eventRepository = module.get<Repository<Event>>(getRepositoryToken(Event));
    cityRepository = module.get<Repository<City>>(getRepositoryToken(City));
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should return all event", async () => {
    // Mock the repository methods to return the mocked data
    jest
      .spyOn(eventRepository, "findAndCount")
      .mockResolvedValue([eventsData, eventsData.length]);

    const result = await service.getAllEvent();
    expect(result.data).toEqual(eventsData);
    expect(result.totalCount).toBe(eventsData.length);
  });

  it("should return all event with pagination", async () => {
    // Mock the repository methods to return the mocked data
    const eventMockResult = eventsData.slice(0, 1);
    jest
      .spyOn(eventRepository, "findAndCount")
      .mockResolvedValue([eventMockResult, eventMockResult.length]);

    const page = 1;
    const limit = 1;
    const result = await service.getAllEvent(page, limit);
    expect(result.data).toEqual(eventMockResult);
    expect(result.totalCount).toBe(limit);
  });

  it("should return event by id", async () => {
    // Mock the repository methods to return the mocked data
    jest.spyOn(eventRepository, "findOne").mockResolvedValue(eventsData[0]);

    const result = await service.getById(eventsData[0].id);
    expect(result).toEqual(eventsData[0]);
  });

  it("should return error when event not found", async () => {
    // Mock the repository methods to return the mocked data
    jest.spyOn(eventRepository, "findOne").mockResolvedValue(null);

    await expect(service.getById(eventsData[0].id)).rejects.toThrowError(
      "Event not found",
    );
  });

  it("should create new event", async () => {
    // Mock the repository methods to return the mocked data
    jest.spyOn(cityRepository, "findOne").mockResolvedValue(citiesData);
    jest.spyOn(eventRepository, "create").mockReturnValue(eventsData[0]);
    jest.spyOn(eventRepository, "save").mockResolvedValue(eventsData[0]);

    const result = await service.createEvent({
      name: "Band Concert",
      price: 1000,
      cityId: citiesData.id,
    });
    expect(result).toEqual(eventsData[0]);
  });
});
