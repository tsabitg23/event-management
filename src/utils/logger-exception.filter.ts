import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

@Catch()
export class LoggerFilter implements ExceptionFilter {
  private logger = new Logger(LoggerFilter.name);
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();
    const status = exception.getStatus ? exception.getStatus() : 500;
    const message = exception.message || 'Internal server error';
    const stack = exception.stack;

    this.logger.error(
      `${request.method} ${request.url}`,
      JSON.stringify({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message,
        stack,
      }),
    );

    response.code(status).send({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
      stack: process.env.NODE_ENV === 'production' ? 'PROTECTED' : stack,
    });
  }
}
