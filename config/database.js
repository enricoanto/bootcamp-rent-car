const {
  DATABASE_USERNAME = process.env.USER,
  DATABASE_PASSWORD = "",
  DATABASE_NAME = "binar_car_rental",
  DATABASE_HOST = "127.0.0.1",
} = process.env;

module.exports = {
  development: {
    username: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME,
    host: DATABASE_HOST,
    dialect: "postgres",
  },
  production: {
    use_env_variable: "DATABASE_URL",
    dialect: "postgres",
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
