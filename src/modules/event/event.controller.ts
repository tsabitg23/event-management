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
import { CreateEventDto } from "./dto/create-event.dto";
import { GetAllEventResponseDto, GetEventResponseDto } from "./dto/event.dto";
import { EventService } from "./event.service";

@ApiTags("Event")
@Controller("event")
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @ApiQuery({ name: "page", required: false, type: Number, example: 1 })
  @ApiQuery({ name: "limit", required: false, type: Number, example: 10 })
  @ApiResponse({
    status: 200,
    description: "Successfully get all events",
    type: GetAllEventResponseDto,
  })
  @ApiOperation({
    summary: "Get all events",
    description: "Get all events or with pagination",
  })
  @Get("/")
  public async getAllEvent(
    @Param("page") page?: number,
    @Param("limit") limit?: number,
  ) {
    return await this.eventService.getAllEvent(page, limit);
  }

  @ApiParam({
    name: "id",
    required: true,
    type: String,
    example: "e2d4c3b6-a2e0-4dbb-bcd9-cef70e9ea841",
    description: "Event ID",
  })
  @ApiResponse({
    status: 200,
    description: "Successfully get event by id",
    type: GetEventResponseDto,
  })
  @ApiResponse({ status: 404, description: "Event not found" })
  @ApiOperation({
    summary: "Get event by id",
    description: "Return single data of event by id",
  })
  @Get(":id")
  public async getById(@Param("id", ParseUUIDPipe) id: string) {
    return {
      data: await this.eventService.getById(id),
    };
  }

  @ApiResponse({ status: 400, description: "Bad request" })
  @ApiResponse({ status: 404, description: "City not found" })
  @ApiResponse({
    status: 201,
    description: "Successfully create event",
    type: GetEventResponseDto,
  })
  @ApiBody({
    type: CreateEventDto,
    description: "Create a new event",
  })
  @ApiOperation({ summary: "Create event", description: "Create a new event" })
  @Post("/")
  public async createEvent(@Body() body: CreateEventDto) {
    const city = await this.eventService.createEvent(body);
    return {
      message: "success",
      data: city,
    };
  }
}
