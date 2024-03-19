import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsInt, IsString, Min } from "class-validator";
import { BaseEntityDto } from "../../../models/base.dto";

export class CityDto extends BaseEntityDto {
  @ApiProperty({ example: "Berlin" })
  @IsString()
  name: string;

  @ApiProperty({ example: "German" })
  @IsString()
  country: string;
}

export class GetCityResponseDto {
  @ApiProperty()
  data: CityDto;
}

export class GetAllCityResponseDto {
  @ApiProperty({ type: [CityDto] })
  @IsArray()
  @Type(() => CityDto)
  data: CityDto[];

  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(0)
  totalCount: number;
}
