import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindManyOptions, Repository } from "typeorm";
import { City } from "../../models/city.entity";
import { CreateCityDto } from "./dto/create-city.dto";

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(City) private cityRepository: Repository<City>,
  ) {}

  // get all city with pagination
  public async getAllCity(
    page?: number,
    limit?: number,
  ): Promise<{ data: City[]; totalCount: number }> {
    let findParam: FindManyOptions<City> | undefined;
    if (page && limit) {
      findParam = {
        skip: (page - 1) * limit,
        take: limit,
      };
    }
    const [cities, totalCount] =
      await this.cityRepository.findAndCount(findParam);

    return {
      data: cities,
      totalCount,
    };
  }

  public async getById(id: string): Promise<City> {
    const city = await this.cityRepository.findOne({
      where: {
        id,
      },
    });

    if (!city) {
      throw new HttpException("City not found", HttpStatus.NOT_FOUND);
    }

    return city;
  }

  // create new data
  public async createCity(data: CreateCityDto): Promise<City> {
    const city = this.cityRepository.create(data);
    await this.cityRepository.save(city);
    return city;
  }
}
