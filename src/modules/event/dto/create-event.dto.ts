import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";

export class CreateEventDto {
  @ApiProperty({
    example: "Berlin Marathon",
    description: "The name of the event",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: "403c34fe-f974-41c4-b8ad-7c3065bdb831",
    description: "City ID",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  cityId: string;

  @ApiProperty({
    example: 100,
    description: "Price of the event in USD",
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  price: number;
}
