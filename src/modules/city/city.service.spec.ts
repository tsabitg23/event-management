import { Test, TestingModule } from "@nestjs/testing";
import { CityService } from "./city.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { City } from "../../models/city.entity";
import { Repository } from "typeorm";

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

describe("CityService", () => {
  let service: CityService;
  let cityRepository: Repository<City>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CityService,
        {
          provide: getRepositoryToken(City),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<CityService>(CityService);
    cityRepository = module.get<Repository<City>>(getRepositoryToken(City));
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should get all city", async () => {
    // Mock the repository methods to return the mocked data
    jest
      .spyOn(cityRepository, "findAndCount")
      .mockResolvedValue([[citiesData], 1]);

    const result = await service.getAllCity(1, 10);
    expect(result).toEqual({ data: [citiesData], totalCount: 1 });
  });

  it("should get city by id", async () => {
    // Mock the repository methods to return the mocked data
    jest.spyOn(cityRepository, "findOne").mockResolvedValue(citiesData);

    const result = await service.getById(citiesData.id);
    expect(result).toEqual(citiesData);
  });

  it("should create city", async () => {
    jest.spyOn(cityRepository, "create").mockReturnValue(citiesData);
    jest.spyOn(cityRepository, "save").mockResolvedValue(citiesData);

    const result = await service.createCity({
      name: "Jakarta",
      country: "Indonesia",
    });
    expect(result).toEqual(citiesData);
  });
});
