import { assertEquals, assertNotEquals } from "jsr:@std/assert";
import client from "../src/clients/supabaseClient.ts";

Deno.test("Database connection test", async () => {
    try {
        await client.connect();

        const result = await client.queryObject<{ connected: number }>("SELECT 1 AS connected");
        assertNotEquals(result.rows.length, 0, "Connection failed, no rows returned");
        assertEquals(result.rows[0].connected, 1, "Connection test query failed");

        console.log("Database connection test passed!");
    } catch (error) {
        console.error("Database connection test failed:", error);
        throw error;
    } finally {
        await client.end();
    }
});

Deno.test("Invalid query test", async () => {
    try {
        await client.connect();

        await client.queryObject("SELECT INVALID_COLUMN FROM non_existent_table");
        throw new Error("Invalid query should have failed, but it did not.");
    } catch (error) {
        const err = error as { name: string };
        assertEquals(err.name, "PostgresError", "Expected a PostgresError for an invalid query");
        console.log("Invalid query test passed!");
    } finally {
        await client.end();
    }
});
