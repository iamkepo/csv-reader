# Backend

## Docker

```sh
docker run -d \
--name tab-reader-postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=tab-reader \
  -p 5433:5432 \
  -v ~/pg-data:/var/lib/postgresql/data \
  postgres:latest
```

## Project Setup

```sh
npm install
```

## Run the backend

```sh
npm run dev
```

## Environment variables

Create a `.env` file at the root of the project with the following variables:

```env
PGHOST=127.0.0.1
PGUSER=postgres
PGPASSWORD=postgres
PGDATABASE=tab-reader
PGPORT=5433
```
