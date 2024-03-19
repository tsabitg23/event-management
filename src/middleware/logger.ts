import { NextFunction, Request, Response } from "express";

export async function LoggerMiddleware(
  request: Partial<Request>,
  response: Partial<Response>,
  next: NextFunction,
): Promise<void> {
  const { body, method, originalUrl, headers } = request;
  await next();
  this.logger.log({
    body,
    method,
    originalUrl,
    headers,
    message: "Incoming request",
    statusCode: response.statusCode,
  });
}
