import { Controller, Get } from "@nestjs/common";
import { ApiExcludeEndpoint } from "@nestjs/swagger";

@Controller()
export class AppController {
  @ApiExcludeEndpoint()
  @Get()
  getHello(): string {
    return "API is running!";
  }
}
