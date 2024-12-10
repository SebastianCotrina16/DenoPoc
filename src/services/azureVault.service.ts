import { keyVaultClient } from "../clients/azureVaultClient.ts";

export async function getDatabaseCert(): Promise<string> {
    try {
        const secret = await keyVaultClient.secret("SUPABASECERT").getValue();
        if (!secret) {
            throw new Error("El certificado obtenido está vacío.");
        }
        return secret;
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error al obtener el certificado del Key Vault:", error.message);
        } else {
            console.error("Error al obtener el certificado del Key Vault:", error);
        }
        throw new Error("No se pudo recuperar el certificado CA desde Azure Key Vault.");
    }
}
