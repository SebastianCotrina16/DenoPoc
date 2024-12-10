import { Client } from "https://deno.land/x/postgres@v0.17.0/mod.ts";

const DATABASE_URL = Deno.env.get("DATABASE_URL");

if (!DATABASE_URL) {
    throw new Error("DATABASE_URL no está definida en las variables de entorno.");
}

const client = new Client(DATABASE_URL);

export default client;
