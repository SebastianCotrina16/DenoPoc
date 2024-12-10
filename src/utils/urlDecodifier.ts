export function urlDecodifier(databaseUrl: string) {
    if (!databaseUrl) {
        throw new Error("La URL de la base de datos no puede estar vacía.");
    }

    const url = new URL(databaseUrl);

    return {
        user: url.username,
        password: url.password,
        host: url.hostname,
        port: url.port,
        database: url.pathname.slice(1),
        sslMode: url.searchParams.get("sslmode"),
    };
}
