import client from "../clients/supabaseClient.ts";

export async function fetchRooms() {
    await client.connect();
    try {
        const result = await client.queryObject("SELECT * FROM room");
        return result.rows;
    } catch (error) {
        console.error("Error al consultar las habitaciones:", error);
        throw error;
    } finally {
        await client.end();
    }
}

fetchRooms().then(console.log).catch(console.error);
