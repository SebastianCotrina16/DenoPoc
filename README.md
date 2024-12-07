# Database
To pull the DB Schemas
deno --env -A --node-modules-dir npm:drizzle-kit pull
To generate Schemas
deno --env -A --node-modules-dir npm:drizzle-kit generate
and then migrate
deno --env -A --node-modules-dir npm:drizzle-kit migrate