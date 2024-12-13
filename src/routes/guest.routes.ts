import { Hono } from "hono";
import { GuestController } from "../controllers/guest.controller.ts";

const guestRouter = new Hono();
const guestController = new GuestController();

guestRouter
    .get("/guests", guestController.getGuests)
    .get("/guests/:id", guestController.getGuestById)
    .post("/guests", guestController.registerGuest)
    .put("/guests/:id", guestController.updateGuest);

export default guestRouter;