import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

const DEFAULT_PORT = 3000;

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { bufferLogs: true },
  );

  app.enableCors();

  // This is a global pipe that will be applied to all routes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const configService = app.get<ConfigService>(ConfigService);
  const port = configService.get<number>('port') || DEFAULT_PORT;
  await app.listen(port, '0.0.0.0', (error, address)=>{
    if(error){
      process.exit(1) 
    }
    console.log(`Server listening on ${address}`);
  });
}
bootstrap();
