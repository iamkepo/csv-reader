import Koa from "koa";
import Router from "koa-router";
import { koaBody } from "koa-body";
import fs from "fs";
import csv from "csv-parser";
import cors from "@koa/cors";
import { pool, initDb } from "./db.js"; // connexion PostgreSQL

const app = new Koa();
const router = new Router();

// Allow cross-origin requests from the Vite dev server
app.use(cors());

router.post("/api/upload", koaBody({ multipart: true }), async (ctx) => {
  const uploaded = ctx.request.files?.file;
  const file = Array.isArray(uploaded) ? uploaded[0] : uploaded;

  if (!file) {
    ctx.status = 400;
    ctx.body = { error: "No file uploaded under field 'file'" };
    return;
  }

  const filePath = file.filepath || file.path; // formidable v3 uses `filepath`
  const fileName = file.originalFilename || file.name || "uploaded.csv";
  const fileSize = file.size ?? 0;

  if (!filePath) {
    ctx.status = 400;
    ctx.body = { error: "Uploaded file path missing" };
    return;
  }

  const start = Date.now();
  const results = [];

  const stream = fs.createReadStream(filePath).pipe(csv());
  for await (const row of stream) {
    results.push(row);
  }

  const duration = Date.now() - start;

  await pool.query(
    "INSERT INTO logs (filename, filesize, duration_ms) VALUES ($1,$2,$3)",
    [fileName, fileSize, duration]
  );

  ctx.body = {
    filename: fileName,
    size: fileSize,
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