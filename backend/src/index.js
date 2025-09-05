import Koa from "koa";
import cors from "@koa/cors";
import { initDb } from "./lib/db.js"; // connexion PostgreSQL
import { getRoutes, router } from "./routes/index.js";

const app = new Koa();

// Allow cross-origin requests from the Vite dev server
app.use(cors());


getRoutes(router);

app.use(router.routes()).use(router.allowedMethods());

// Initialize DB then start server
try {
  await initDb();
} catch (e) {
  console.error("❌ DB init failed:", e.message);
}

app.listen(3000, () => console.log("🚀 API running on 3000"));