import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";

export default class InitialSeed implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const cities = [
      {
        id: "cfca3aab-2466-4b51-8456-c60266ee532c",
        name: "Berlin",
        country: "Germany",
      },
    ];

    const events = [
      {
        id: "4eb2fa81-a4a2-48dd-93a9-9c858cee0f1d",
        name: "Berlin Music Festival",
        price: 100,
        cityId: cities[0].id,
      },
    ];
    // insert city
    await connection
      .createQueryBuilder()
      .insert()
      .into("city")
      .values(cities)
      .orUpdate(["name"], ["id"])
      .execute();

    // insert event
    await connection
      .createQueryBuilder()
      .insert()
      .into("event")
      .values(events)
      .orUpdate(["name", "price", "cityId"], ["id"])
      .execute();
  }
}
