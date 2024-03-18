import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventService } from './event.service';
import { Event } from 'src/models/event.entity';
import { EventController } from './event.controller';
import { CityModule } from '../city/city.module';

@Module({
  imports: [TypeOrmModule.forFeature([Event]), CityModule],
  providers: [EventService],
  controllers: [EventController],
  exports: []
})
export class EventModule { }