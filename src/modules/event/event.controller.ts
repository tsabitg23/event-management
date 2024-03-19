import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';

@Controller('event')
export class EventController {
    constructor(private readonly eventService: EventService) {}
    @Get('/')
    public async getAllEvent(@Param('page') page: number, @Param('limit') limit: number){
        return await this.eventService.getAllEvent(page, limit)
    }

    @Get(':id')
    public async getById(@Param('id', ParseUUIDPipe) id: string) {
        return {
            data: await this.eventService.getById(id)
        }
    }

    @Post('/')
    public async createEvent(@Body() body: CreateEventDto) {
        try {
            const city = await this.eventService.createEvent(body);
            return {
                message: "success",
                data: city
            }
        } catch (error) {
            throw error;
        }
    }
}
