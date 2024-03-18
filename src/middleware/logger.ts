import { NextFunction, Request, Response } from 'express';


export async function LoggerMiddleware(request: Request, response: Response, next: NextFunction): Promise<void> {
    const {body, method, originalUrl, headers} = request;
    await next();
    this.logger.log({body, method, originalUrl, headers, message: 'Incoming request', statusCode: response.statusCode});
}