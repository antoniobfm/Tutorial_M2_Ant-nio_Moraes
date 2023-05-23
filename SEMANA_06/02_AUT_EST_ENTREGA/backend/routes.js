import { Router } from "express";
import formacoesRoutes from "./formacoes/index.js";

const routes = Router();

routes.use("/", formacoesRoutes);

export default routes;
