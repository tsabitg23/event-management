import appConfig from "./appConfig";

describe("appConfig", () => {
  beforeEach(() => {
    // Reset environment variables before each test
    delete process.env.PORT;
    delete process.env.DATABASE_CLIENT;
    delete process.env.DATABASE_NAME;
    delete process.env.TYPEORM_SYNCHRONIZE;
  });

  it("should return default values when environment variables are not provided", () => {
    const config = appConfig();
    expect(config.port).toEqual(3000);
    expect(config.database.client).toEqual("sqlite"); // Default value should be sqlite
    expect(config.database.name).toEqual("event_manager.db"); // Default value should be undefined
    expect(config.database.synchronize).toEqual(false);
  });

  it("should use environment variables when provided", () => {
    process.env.PORT = "4000";
    process.env.DATABASE_CLIENT = "mysql";
    process.env.DATABASE_NAME = "testdb";
    process.env.TYPEORM_SYNCHRONIZE = "true";

    const config = appConfig();
    expect(config.port).toEqual(4000);
    expect(config.database.client).toEqual("mysql");
    expect(config.database.name).toEqual("testdb");
    expect(config.database.synchronize).toEqual(true);
  });

  it("should return values of the correct types", () => {
    const config = appConfig();
    expect(typeof config.port).toEqual("number");
    expect(typeof config.database.client).toEqual("string");
    expect(typeof config.database.name).toEqual("string");
    expect(typeof config.database.synchronize).toEqual("boolean");
  });
});
