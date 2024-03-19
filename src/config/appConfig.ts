require('dotenv').config();
export default () => {
    return {
        port : parseInt(process.env.PORT || "", 10) || 3000,
        database: {
            client: process.env.DATABASE_CLIENT,
            name: process.env.DATABASE_NAME,
            synchronize: process.env.TYPEORM_SYNCHRONIZE || false,
          },
    }
}