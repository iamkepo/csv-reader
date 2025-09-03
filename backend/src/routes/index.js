import Router from "koa-router";
import uploadRoutes from "./api/upload.js";
import logsRoutes from "./api/logs.js";

export const router = new Router();

export const getRoutes = (router) => {
  router.use(uploadRoutes.routes());
  router.use(logsRoutes.routes());
};
