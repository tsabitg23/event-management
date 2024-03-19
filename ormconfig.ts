export default {
  name: "default",
  type: "sqlite",
  database: process.env.DATABASE_NAME,
  entities: ["src/**/*.entity.ts"],
  synchronize: true,
  logging: false,
  seeds: ["src/database/seeds/**/*{.ts,.js}"],
};
