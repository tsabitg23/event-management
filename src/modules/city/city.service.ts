import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { error } from 'console';
import { City } from 'src/models/city.entity';
import { Repository } from 'typeorm';
import { CreateCityDto } from './dto/create_city.dto';

@Injectable()
export class CityService {
    constructor(@InjectRepository(City) private cityRepository: Repository<City>) {}

    // get all city with pagination
    public async getAllCity(page = 1, limit = 10): Promise<City[]> {
        const cities = await this.cityRepository.find({
            take: limit,
            skip: (page - 1) * limit
        });

        return cities;
    }

    public async getById(id: string): Promise<City> {
        const city = await this.cityRepository.findOne({
            where: {
                id
            }
        });

        if (!city) {
            throw new HttpException('City not found', HttpStatus.NOT_FOUND);
        }

        return city;
    }

    // create new data
    public async createCity(data: CreateCityDto): Promise<City> {
        try {
            const city = this.cityRepository.create(data);
            await this.cityRepository.save(city);
            return city;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
