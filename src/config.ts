import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "lcalhost",
    port: 8080,
    username: "Cuneo",
    password: "Cuneo",
    database: "productos",
    synchronize: true,
    logging: true,
    entities: [],
    subscribers: [],
    migrations: []
});