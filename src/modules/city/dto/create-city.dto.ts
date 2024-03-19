import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCityDto {
  @ApiProperty({
    example: "Berlin",
    description: "City name",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: "Germany",
    description: "Country name",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  country: string;
}
