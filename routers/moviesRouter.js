import { Router } from "express";

/**
 * Router que manejara las rutas de /movies
 * @type {Router} Router
 */
const movieRouter = Router();

movieRouter.get("/", (req, res) => {
  res.send("PAGINA DE PELICULAS");
});

export default movieRouter;