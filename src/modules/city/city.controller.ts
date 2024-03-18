import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { CityService } from './city.service';

@Controller('city')
export class CityController {
    constructor(private readonly cityService: CityService) {}

    @Get(':id')
    public async getById(@Param('id', ParseUUIDPipe) id: string) {
        return await this.cityService.getById(id);
    }
}
