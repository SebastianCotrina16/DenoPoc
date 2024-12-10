import { AzureADApplication } from "https://deno.land/x/azure_storage_client@0.9.0/mod.ts";
import { KeyVault } from "https://deno.land/x/azure_storage_client@0.9.0/vault.ts";

const tenantId = Deno.env.get("AZURE_TENANT_ID");
const clientId = Deno.env.get("AZURE_CLIENT_ID");
const clientSecret = Deno.env.get("AZURE_CLIENT_SECRET");
const keyVaultName = Deno.env.get("AZURE_KEY_VAULT_NAME");

if (!tenantId || !clientId || !clientSecret || !keyVaultName) {
    throw new Error("Faltan variables de entorno para configurar Azure Key Vault.");
}

const azureApp = new AzureADApplication({
    tenantId,
    clientId,
    clientSecret,
});

export const keyVaultClient = new KeyVault(azureApp, keyVaultName);
