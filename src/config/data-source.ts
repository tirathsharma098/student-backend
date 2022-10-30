import path from "path";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
dotenv.config();
const postgresPort: number = parseInt(<string>process.env.POSTGRES_PORT, 10) || 3005;
export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: postgresPort,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: true,
    logging: true,
    entities: [path.join(__dirname, "../entities/*{.ts,.js}")],
    subscribers: [],
    migrations: [],
})