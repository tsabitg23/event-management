import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import {
  WinstonModule,
  utilities as nestWinstonModuleUtilities,
} from "nest-winston";
import * as winston from "winston";
import { AppModule } from "./app.module";
import { LoggerMiddleware } from "./middleware/logger";
import { LoggerFilter } from "./utils/logger-exception.filter";

const DEFAULT_PORT = 3000;

async function bootstrap() {
  const logger = WinstonModule.createLogger({
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp(),
          nestWinstonModuleUtilities.format.nestLike(),
        ),
      }),
    ],
  });
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      bufferLogs: false,
      logger: logger,
    },
  );

  app.enableCors();

  // This is a global pipe that will be applied to all routes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  // DOCUMENTATION
  const config = new DocumentBuilder()
    .setTitle("Event Manager API Spec")
    .setDescription("For hiring purposes")
    .addServer("http://localhost:3000/", "Local environment")
    .setVersion("1.0")
    .addTag("event")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document);

  // LOGGER
  app.use(
    LoggerMiddleware.bind({
      logger,
    }),
  );
  // app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalFilters(new LoggerFilter());

  // PORT
  const configService = app.get<ConfigService>(ConfigService);
  const port = configService.get<number>("port") || DEFAULT_PORT;
  await app.listen(port, "0.0.0.0", (error, address) => {
    if (error) {
      // this.logger.error(`Error: ${error}`);
      logger.error(`Error: ${error}`);
      process.exit(1);
    }
    logger.log(`Server listening on ${address}`);
    // this.logger.log(`Server listening on ${address}`);
  });
}
bootstrap();
