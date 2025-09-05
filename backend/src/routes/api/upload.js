import { koaBody } from "koa-body";
import Router from "koa-router";
import fs from "fs";
import csv from "csv-parser";
import pkg from "xlsx";
import { create } from "../../lib/model.js";

const { readFile, utils } = pkg;
const router = new Router();

router.post("/api/upload", koaBody({ multipart: true, formidable: { maxFileSize: 524288000 } }), async (ctx) => {
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

  await create("logs", {
    filename: fileName,
    filesize: fileSize,
    duration_ms: duration,
  });

  ctx.body = {
    filename: fileName,
    size: fileSize,
    duration,
    rows: results.slice(0, 50), // limite affichage
  };
});

export default router;