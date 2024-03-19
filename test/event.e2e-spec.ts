import * as request from "supertest";
import { Test } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import { CityModule } from "../src/modules/city/city.module";
import { EventModule } from "../src/modules/event/event.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import * as Joi from "joi";
import { TypeOrmModule } from "@nestjs/typeorm";
import appConfig from "../src/config/appConfig";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { Repository } from "typeorm";
import { Event } from "../src/models/event.entity";
import { City } from "../src/models/city.entity";
import exp from "constants";

const sampleCityData = {
  name: "Berlin",
  country: "Germany",
};

const sampleEventData = {
  name: "Berlin Marathon",
  price: 100,
};

describe("Event E2E", () => {
  let app: INestApplication;
  let eventRepository: Repository<Event>;
  let cityRepository: Repository<City>;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRootAsync({
          useFactory: () => {
            return {
              type: "sqlite",
              database: "event_manager_db_test",
              entities: [],
              synchronize: true,
              autoLoadEntities: true,
              logging: false,
              namingStrategy: new SnakeNamingStrategy(),
            };
          },
        }),
        CityModule,
        EventModule,
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    cityRepository = moduleRef.get("CityRepository");
    eventRepository = moduleRef.get("EventRepository");
    await app.init();
  });

  it(`/POST city`, async () => {
    // test create flow
    const response = await request(app.getHttpServer())
      .post("/city")
      .send(sampleCityData)
      .expect(201);

    expect(response.body.data).toEqual(expect.objectContaining(sampleCityData));
  });

  it("/POST event", async () => {
    // get city then create new event
    const city = await cityRepository.findOne({
      where: {
        name: sampleCityData.name,
      },
    });
    // expect city is exist
    expect(city).toBeDefined();

    const sampleEventInput = {
      ...sampleEventData,
      cityId: city?.id,
    };
    const response = await request(app.getHttpServer())
      .post("/event")
      .send(sampleEventInput)
      .expect(201);

    expect(response.body.data).toEqual(
      expect.objectContaining(sampleEventData),
    );
    expect(response.body.data.city).toEqual(
      expect.objectContaining(sampleCityData),
    );

    // input another event
    const sampleEventInput2 = {
      ...sampleEventData,
      name: "Berlin Marathon 2",
      cityId: city?.id,
    };

    const response2 = await request(app.getHttpServer())
      .post("/event")
      .send(sampleEventInput2)
      .expect(201);

    expect(response2.body.message).toEqual("success");
  });

  it("should retrieve data via /GET and /GET/:id", async () => {
    const [eventData, totalCount] = await eventRepository.findAndCount({
      select: ["id", "name", "price"],
      relations: ["city"],
      order: {
        createDateTime: "DESC",
      },
    });
    const sampleEvent = eventData[0];

    const getAllEvent = await request(app.getHttpServer())
      .get("/event")
      .expect(200);

    const expectedEventResult = eventData.map((event) =>
      expect.objectContaining({
        id: event.id,
        name: event.name,
        price: event.price,
        city: expect.objectContaining({
          id: event.city?.id,
          name: event.city?.name,
          country: event.city?.country,
        }),
      }),
    );
    expect(getAllEvent.body.totalCount).toEqual(totalCount);
    expect(getAllEvent.body.data).toEqual(
      expect.arrayContaining(expectedEventResult),
    );

    // check get by id
    const getEventById = await request(app.getHttpServer())
      .get(`/event/${sampleEvent.id}`)
      .expect(200);

    const expectedSelectedEvent = {
      name: sampleEvent.name,
      price: sampleEvent.price,
      city: expect.objectContaining({
        id: sampleEvent.city?.id,
        name: sampleEvent.city?.name,
        country: sampleEvent.city?.country,
      }),
    };
    expect(getEventById.body.data).toEqual(
      expect.objectContaining(expectedSelectedEvent),
    );
  });

  afterAll(async () => {
    // clear table city and event where data like sample
    await eventRepository.clear();
    await cityRepository.clear();

    await app.close();
  });
});
