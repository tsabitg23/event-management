import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private logger = new Logger(HttpExceptionFilter.name);
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();
    const status = exception.getStatus();
    const errorResponse:(string | Record<string, any>) = exception.getResponse();
    const errorLog = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      error: errorResponse
    };
    this.logger.error('HttpExceptionFilter', errorLog);
    response
      .code(status)
      .send(errorLog);
  }
}
