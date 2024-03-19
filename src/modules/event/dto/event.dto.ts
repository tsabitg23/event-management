import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsInt, IsNumber, IsString, Min } from "class-validator";
import { BaseEntityDto } from "../../../models/base.dto";
import { CityDto } from "../../../modules/city/dto/city.dto";

export class EventDto extends BaseEntityDto {
  @ApiProperty({
    example: "Berlin Marathon",
    description: "The name of the event",
  })
  @IsString()
  name: string;

  @ApiProperty({ example: 100, description: "Price of the event" })
  @IsNumber()
  price: string;

  @ApiProperty({
    type: CityDto,
    description: "City which the event is taking place",
  })
  city: CityDto;
}

export class GetEventResponseDto {
  @ApiProperty()
  data: EventDto;
}

export class GetAllEventResponseDto {
  @ApiProperty({ type: [EventDto] })
  @IsArray()
  @Type(() => EventDto)
  data: EventDto[];

  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(0)
  totalCount: number;
}
