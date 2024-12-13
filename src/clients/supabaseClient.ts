import { Client } from "https://deno.land/x/postgres@v0.17.0/mod.ts";
import { postgresConfig } from "../config/dbConfig.ts";

const client = new Client({
    hostname: postgresConfig.host,
    port: parseInt(postgresConfig.port),
    user: postgresConfig.user,
    password: postgresConfig.password,
    database: postgresConfig.database,
});

export default client;
