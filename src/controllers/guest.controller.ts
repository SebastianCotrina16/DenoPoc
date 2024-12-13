import { GuestService } from "../services/guest.service.ts";
import { Context } from 'hono';

const guestService = new GuestService();

export class GuestController {
    async getGuestById(c: Context) {
        const id = Number(c.req.param("id"));
        if (isNaN(id)) {
            return c.json({ message: "Id invalido" }, 400);
        }

        const guest = await guestService.getGuestById(id);
        if (guest) {
            return c.json(guest, 200);
        } else {
            return c.json({ message: "Huesped no encontrado" }, 404);
        }
    }

    async getGuests(c: Context) {
        const guests = await guestService.getGuests();
        return c.json(guests, 200);
    }

    async registerGuest(c: Context) {
        const body = await c.req.json();
        if (!body.name || !body.contactInfo) {
            return c.json({ message: "Datos invalidos" }, 400);
        }

        const newGuest = await guestService.registerGuest(body);
        return c.json(newGuest, 201);
    }

    async updateGuest(c: Context) {
        const id = Number(c.req.param("id"));
        if (isNaN(id)) {
            return c.json({ message: "Id invalido" }, 400);
        }

        const updates = await c.req.json();
        const guest = await guestService.updateGuest(id, updates);
        if (guest) {
            return c.json(guest, 200);
        } else {
            return c.json({ message: "Huesped no encontrado" }, 404);
        }
    }
}
