import Koa from "koa";
import Router from "koa-router";
import { koaBody } from "koa-body";
import fs from "fs";
import csv from "csv-parser";
import cors from "@koa/cors";
import pkg from "xlsx";
const { readFile, utils } = pkg;
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
  let results = [];
  const ext = fileName?.split(".").pop()?.toLowerCase();

  if (ext === "csv") {
    const stream = fs.createReadStream(filePath).pipe(csv());
    for await (const row of stream) {
      results.push(row);
    }
  } else if (ext === "xlsx") {
    const workbook = readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    results = utils.sheet_to_json(workbook.Sheets[sheetName], { defval: "" });
  } else {
    ctx.throw(400, "Format non supporté");
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