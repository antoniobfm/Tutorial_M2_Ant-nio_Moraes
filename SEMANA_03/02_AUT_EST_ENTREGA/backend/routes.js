import { Router } from "express";
import formacoesRoutes from "./formacoes/index.js";

const routes = Router();

routes.use("/formacoes", formacoesRoutes);

export default routes;
