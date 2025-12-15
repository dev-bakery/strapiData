module.exports = ({ env }) => ({
  connection: {
    client: env("DATABASE_CLIENT", "sqlite"),
    connection:
      env("DATABASE_CLIENT") === "postgres"
        ? {
            connectionString: env("DATABASE_URL"),
            ssl: {
              rejectUnauthorized: false,
            },
          }
        : {
            filename: env("DATABASE_FILENAME", ".tmp/data.db"),
          },
    useNullAsDefault: true,
  },
});
