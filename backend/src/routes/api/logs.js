import Router from "koa-router";
import { getList } from "../../lib/model.js";

const router = new Router();

router.get("/api/logs", async (ctx) => {
  const rows = await getList("logs", "processed_at");
  ctx.body = rows;
});

export default router;