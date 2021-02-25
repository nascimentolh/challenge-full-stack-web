import config from "config";

export default {
  type: "postgres",
  host: config.get("App.database.host"),
  port: config.get("App.database.port"),
  username: config.get("App.database.username"),
  password: config.get("App.database.password"),
  database: config.get("App.database.name"),
  entities: ["./src/modules/**/entities/*.ts"],
  migrations: ["./src/shared/infra/typeorm/migrations/*.ts"],
  cli: {
    migrationsDir: "./src/shared/infra/typeorm/migrations",
  },
};
