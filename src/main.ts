import { Hono, Context } from 'hono';

const app = new Hono();


app.get('/', (c: Context) => c.text("Hello World!"))

Deno.serve(app.fetch)