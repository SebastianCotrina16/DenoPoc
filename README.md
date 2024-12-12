# Database
To pull the DB Schemas
```bash
deno --env -A --node-modules-dir npm:drizzle-kit pull
```
To generate Schemas
```bash
deno --env -A --node-modules-dir npm:drizzle-kit generate
```
and then migrate
```bash
deno --env -A --node-modules-dir npm:drizzle-kit migrate
```

# Running Files
To Run a File with environment variables
```bash
deno run -A --env-file ./path/to/file
```
Without
```bash
deno run -A ./path/to/file
```
Hono:
Running Hono
```bash
deno task start
```

Additional:

- "-A" flag stands for `Allow all` and prevents Deno from prompting for permissions on every run\
- These commands can be simplified on the deno.json \
- Use deno-postgresql driver instead of `pg` as the latter has compatibility issues when connecting to Supabase (Not tested with other clouds providers)