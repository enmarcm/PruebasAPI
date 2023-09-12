import { Router } from "express";

/**
 * Es el Router que maneja la Ruta Principal
 * @type {Router} Router
 */
const mainRouter = Router()

mainRouter.get("/", (req, res) => {
  res.set('Content-Type', 'text/html').end("PAGINA PRINCIPAL");
});

export default mainRouter;