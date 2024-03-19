import { Body, Controller, Get, Logger, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { CityService } from './city.service';
import { CreateCityDto } from './dto/create-city.dto';

@Controller('city')
export class CityController {
    constructor(private readonly cityService: CityService) {}
    
    @Get('/')
    public async getAllCity(@Param('page') page: number, @Param('limit') limit: number){
        return await this.cityService.getAllCity(page, limit)
        
    }

    @Get(':id')
    public async getById(@Param('id', ParseUUIDPipe) id: string) {
        return {
            data: await this.cityService.getById(id)
        }
    }

    @Post('/')
    public async createCity(@Body() body: CreateCityDto) {
        try {
            const city = await this.cityService.createCity(body);
            return {
                message: "success",
                data: city
            }
        } catch (error) {
            throw error;
        }
    }
}
