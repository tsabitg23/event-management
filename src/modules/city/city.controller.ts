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
  ApiOperation,
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

  @ApiQuery({ name: "page", required: false, type: Number, example: 1 })
  @ApiQuery({ name: "limit", required: false, type: Number, example: 10 })
  @ApiResponse({
    status: 200,
    description: "Successfully get all cities",
    type: GetAllCityResponseDto,
  })
  @ApiOperation({
    summary: "Get all cities",
    description: "Get all cities or with pagination",
  })
  @Get("/")
  public async getAllCity(
    @Param("page") page?: number,
    @Param("limit") limit?: number,
  ): Promise<GetAllCityResponseDto> {
    return await this.cityService.getAllCity(page, limit);
  }

  @ApiParam({
    name: "id",
    required: true,
    type: String,
    example: "e2d4c3b6-a2e0-4dbb-bcd9-cef70e9ea841",
    description: "City ID",
  })
  @ApiResponse({
    status: 200,
    description: "Successfully get city by id",
    type: GetCityResponseDto,
  })
  @ApiResponse({ status: 404, description: "City not found" })
  @ApiOperation({
    summary: "Get city by id",
    description: "Return single data of city by id",
  })
  @Get(":id")
  public async getById(
    @Param("id", ParseUUIDPipe) id: string,
  ): Promise<GetCityResponseDto> {
    return {
      data: await this.cityService.getById(id),
    };
  }

  @ApiBody({
    type: CreateCityDto,
    description: "Create a new city",
  })
  @ApiResponse({
    status: 201,
    description: "Successfully created new Data",
    type: GetCityResponseDto,
  })
  @ApiResponse({ status: 400, description: "Bad Request" })
  @ApiOperation({ summary: "Create city", description: "Create new city data" })
  @Post("/")
  public async createCity(@Body() body: CreateCityDto) {
    const city = await this.cityService.createCity(body);
    return {
      message: "success",
      data: city,
    };
  }
}
