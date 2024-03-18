import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { error } from 'console';
import { City } from 'src/models/city.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CityService {
    constructor(@InjectRepository(City) private cityRepository: Repository<City>) {}

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
}
