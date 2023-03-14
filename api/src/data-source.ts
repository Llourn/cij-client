import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User.js";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "pgContainer",
  port: 5432,
  username: "postgres",
  password: "password",
  database: "test",
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: [],
});
