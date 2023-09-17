import { Router } from "express";
import MovieModel from "../models/local/movieModel.js";
import MovieController from "../controllers/movieController.js";
/**
 * Router que manejara las rutas de /movies
 * @type {Router} Router
 */
const movieRouter = Router();
const controller = new MovieController({ MovieModel });

movieRouter.get("/", controller.getAll);
movieRouter.get("/:id", controller.getByID);
movieRouter.delete("/:id", controller.delete);
movieRouter.patch("/:id", controller.update);
movieRouter.post("/", controller.create);
movieRouter.options("/", controller.options);

export default movieRouter;