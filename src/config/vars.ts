require("custom-env").env(process.env.NODE_ENV);

const configs = {
  production: {
    port: process.env.PORT,
    secret_key: process.env.SECRET_KEY,
    db: {
      host: process.env.MONGO_HOST,
      database: process.env.MONGO_DB
    },
  },
  development: {
    port: process.env.PORT,
    secret_key: process.env.SECRET_KEY,
    db: {
      host: process.env.MONGO_HOST,
      database: process.env.MONGO_DB
    },
  },
};

export const config = configs[process.env.NODE_ENV];
