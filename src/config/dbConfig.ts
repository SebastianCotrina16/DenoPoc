import { urlDecodifier } from "../utils/urlDecodifier.ts";

const DATABASE_URL = Deno.env.get("DATABASE_URL");

if (!DATABASE_URL) {
    throw new Error("DATABASE_URL no está definida en las variables de entorno.");
}

const dbConfig = urlDecodifier(DATABASE_URL);

export const postgresConfig = {
    ...dbConfig,
}