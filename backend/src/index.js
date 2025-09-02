import Koa from "koa";
import Router from "koa-router";
import { koaBody } from "koa-body";
import fs from "fs";
import csv from "csv-parser";
import { pool, initDb } from "./db.js"; // connexion PostgreSQL

const app = new Koa();
const router = new Router();

router.post("/api/upload", koaBody({ multipart: true }), async (ctx) => {
  const file = ctx.request.files.file;
  const start = Date.now();

  const results = [];
  const stream = fs.createReadStream(file.path).pipe(csv());
  
  for await (const row of stream) {
    results.push(row);
  }

  const duration = Date.now() - start;

  await pool.query(
    "INSERT INTO logs (filename, filesize, duration_ms) VALUES ($1,$2,$3)",
    [file.name, file.size, duration]
  );

  ctx.body = {
    filename: file.name,
    size: file.size,
    duration,
    rows: results.slice(0, 50), // limite affichage
  };
});

router.get("/api/logs", async (ctx) => {
  const { rows } = await pool.query("SELECT * FROM logs ORDER BY processed_at DESC");
  ctx.body = rows;
});

app.use(router.routes()).use(router.allowedMethods());

// Initialize DB then start server
try {
  await initDb();
} catch (e) {
  console.error("❌ DB init failed:", e.message);
}

app.listen(3000, () => console.log("🚀 API running on 3000"));