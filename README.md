# Database
To pull the DB Schemas (Only if you already have the tables on the db)
```bash
deno task db:pull
```
To generate Schemas
```bash
deno task db:generate
```
and then migrate
```bash
deno task db:migrate
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

Testing:
- After setting up the database and running the API (port 8000):
```bash
curl -X POST http://localhost:8000/api/guests -H "Content-Type: application/json" -d '{"name": "Cocoliso", "contactInfo": "cocoliso@gmail.com"}'
curl -X GET http://localhost:8000/api/guests
curl -X PUT http://localhost:3000/api/guests/3 -H "Content-Type: application/json" -d '{"name": "Popeye", "contactInfo": "poepeye@gmail.com"}'
curl -X GET http://localhost:8000/api/guests/1
```



