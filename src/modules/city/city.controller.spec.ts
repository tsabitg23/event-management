import { Test, TestingModule } from '@nestjs/testing';
import { CityController } from './city.controller';
import { CityService } from './city.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { City } from '../../models/city.entity';
import { Repository } from 'typeorm';

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

describe('CityController', () => {
  let controller: CityController;
  let service: CityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CityController],
      providers: [
        CityService,
        {
          provide: getRepositoryToken(City),
          useClass: Repository
        }
      ],
    }).compile();

    controller = module.get<CityController>(CityController);
    service = module.get<CityService>(CityService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get all city', async () => {
    const result = {
      data: [citiesData],
      totalCount: 1
    }
    jest.spyOn(service, 'getAllCity').mockResolvedValue(result);

    expect(await controller.getAllCity(1, 10)).toBe(result);
  });

  it('should get city by id', async () => {
    jest.spyOn(service, 'getById').mockResolvedValue(citiesData);

    const selectedCity = await controller.getById(citiesData.id);
    expect(selectedCity).toStrictEqual({data: citiesData});
  });

  it('should create city', async () => {
    const result = {
      message: "success",
      data: citiesData
    }
    jest.spyOn(service, 'createCity').mockResolvedValue(citiesData);

    const createCity = await controller.createCity(citiesData);
    expect(createCity).toStrictEqual(result);
  });
});
