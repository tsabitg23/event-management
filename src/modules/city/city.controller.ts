import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from "@nestjs/common";
import {
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { CityService } from "./city.service";
import { GetAllCityResponseDto, GetCityResponseDto } from "./dto/city.dto";
import { CreateCityDto } from "./dto/create-city.dto";

@ApiTags("City")
@Controller("city")
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @ApiResponse({
    status: 200,
    description: "Successfully get all city",
    type: GetAllCityResponseDto,
  })
  @ApiQuery({ name: "page", required: false, type: Number, example: 1 })
  @ApiQuery({ name: "limit", required: false, type: Number, example: 10 })
  @Get("/")
  public async getAllCity(
    @Param("page") page?: number,
    @Param("limit") limit?: number,
  ): Promise<GetAllCityResponseDto> {
    return await this.cityService.getAllCity(page, limit);
  }

  @ApiResponse({
    status: 200,
    description: "Successfully get city by id",
    type: GetCityResponseDto,
  })
  @ApiResponse({ status: 404, description: "City not found" })
  @ApiParam({ name: "id", required: true, type: String })
  @Get(":id")
  public async getById(
    @Param("id", ParseUUIDPipe) id: string,
  ): Promise<GetCityResponseDto> {
    return {
      data: await this.cityService.getById(id),
    };
  }

  @ApiResponse({
    status: 201,
    description: "Successfully created new Data",
    type: GetCityResponseDto,
  })
  @ApiResponse({ status: 400, description: "Bad Request" })
  @ApiBody({
    type: CreateCityDto,
    description: "Create a new city",
  })
  @Post("/")
  public async createCity(@Body() body: CreateCityDto) {
    const city = await this.cityService.createCity(body);
    return {
      message: "success",
      data: city,
    };
  }
}
