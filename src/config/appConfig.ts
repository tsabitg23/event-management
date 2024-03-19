export default () => {
  return {
    port: parseInt(process.env.PORT || "", 10) || 3000,
    database: {
      client: process.env.DATABASE_CLIENT || "sqlite",
      name: process.env.DATABASE_NAME || "event_manager.db",
      synchronize: !!process.env.TYPEORM_SYNCHRONIZE || false,
    },
  };
};
