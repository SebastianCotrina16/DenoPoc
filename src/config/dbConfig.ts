import { urlDecodifier } from "../utils/urlDecodifier.ts";
import { getDatabaseCert } from "../services/azureVault.service.ts";

const DATABASE_URL = Deno.env.get("DATABASE_URL");

if (!DATABASE_URL) {
    throw new Error("DATABASE_URL no está definida en las variables de entorno.");
}

const dbConfig = urlDecodifier(DATABASE_URL);
const caCert = await getDatabaseCert();

export const postgresConfig = {
    ...dbConfig,
    tls: {
        enforce: true,
        caCertificates: [caCert],
    },
}