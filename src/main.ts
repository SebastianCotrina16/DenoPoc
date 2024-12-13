import { Hono } from 'hono';
import guestRouter from "./routes/guest.routes.ts";

const app = new Hono();

app.route("/api", guestRouter);

app.notFound((c) => c.json({ error: "Route not found" }, 404));

app.onError((err, c) => {
    console.error("Unhandled Error:", err);
    return c.json({ error: "Internal Server Error" }, 500);
});

Deno.serve(app.fetch)