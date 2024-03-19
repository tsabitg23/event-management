import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from "@nestjs/common";
import { FastifyReply, FastifyRequest } from "fastify";

@Catch()
export class LoggerFilter implements ExceptionFilter {
  private logger = new Logger(LoggerFilter.name);
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();
    const status = exception.getStatus ? exception.getStatus() : 500;
    const errorResponse = exception.getResponse();
    const stack = exception.stack;

    const loggerData = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      errorResponse,
      stack,
    };

    this.logger.error(
      `${request.method} ${request.url}`,
      JSON.stringify(loggerData),
    );

    response.code(status).send({
      ...loggerData,
      stack: process.env.NODE_ENV === "production" ? "PROTECTED" : stack,
    });
  }
}
