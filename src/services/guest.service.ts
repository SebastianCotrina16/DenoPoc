import client from "../clients/supabaseClient.ts";
import { Guest, RegisterGuestInput, UpdateGuestInput } from "../types/guest.ts";

export class GuestService {
    async getGuestById(id: number): Promise<Guest | null> {
        const query = `SELECT * FROM guest WHERE id = ${id}`;
        await client.connect();
        try {
            const result = await client.queryObject<Guest>(query);
            return result.rows.length > 0 ? result.rows[0] : null;
        } catch (error) {
            console.error("Error al consultar los huespedes:", error);
            throw error;
        } finally {
            await client.end();
        }
    }

    async getGuests(): Promise<Guest[]> {
        const query = "SELECT * FROM guest";
        await client.connect();
        try {
            const result = await client.queryObject<Guest>(query);
            return result.rows;
        } catch (error) {
            console.error("Error al consultar los huespedes:", error);
            throw error;
        } finally {
            await client.end();
        }
    }

    async registerGuest(guest: RegisterGuestInput): Promise<Guest> {
        const query = `
            INSERT INTO guest (name, contact_info)
            VALUES ('${guest.name}', '${guest.contactInfo}')
            RETURNING *;
        `;
        await client.connect();
        try {
            const result = await client.queryObject<Guest>(query);
            return result.rows[0];
        } catch (error) {
            console.error("Error al registrar el huesped:", error);
            throw error;
        } finally {
            await client.end();
        }
    }

    async updateGuest(id: number, updates: UpdateGuestInput): Promise<Guest | null> {
        const setClauses = [];
        const values: (string | null | number)[] = [];
        let index = 1;

        if (updates.name) {
            setClauses.push(`name = $${index++}`);
            values.push(updates.name);
        }

        if (updates.contactInfo !== undefined) {
            setClauses.push(`contact_info = $${index++}`);
            values.push(updates.contactInfo || null);
        }

        if (setClauses.length === 0) {
            return null;
        }

        const query = `
            UPDATE guest
            SET ${setClauses.join(", ")}
            WHERE id = $${index}
            RETURNING *;
        `;
        values.push(id);

        await client.connect();
        try {
            const { rows } = await client.queryObject<Guest>(query, values);
            return rows.length ? rows[0] : null;
        } catch (error) {
            console.error("Error al actualizar el huesped:", error);
            throw error;
        } finally {
            await client.end();
        }
    }
}

