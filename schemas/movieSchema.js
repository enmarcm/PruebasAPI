import { z } from "zod";

/**
 * Esquema de una pelicula
 * @type {Object} movieSchema
 */
const movieSchema = z.object({
  adult: z.boolean(),
  backdrop_path: z.string().url(),
  genre_ids: z.array(z.number().int()),
  id: z.number().int().positive(),
  original_language: z.string().length(2),
  original_title: z.string(),
  overview: z.string(),
  popularity: z.number().positive(),
  poster_path: z.string().url(),
  release_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  title: z.string(),
  video: z.boolean(),
  vote_average: z.number().positive(),
  vote_count: z.number().int().positive(),
});

/**
 * Sirve para verificar que el objeto enviado corresponda estrictamente con el esquema de una pelicula
 * @param {Object} obj
 * @param {Object} obj.movie - Objeto a verificar si es una pelicula
 * @returns {Promise<Object>} - Devuelve una promesa que se resuelve con un objeto que contiene success y data
 */
const verifyMovie = async ({ movie }) =>
  await movieSchema.safeParseAsync(movie);

/**
 * Sirve para verificar que las propiedades del objeto enviado correspondan con el esquema de una pelicula, pero no valida que estene estrictamente todos los datos del esquema, si no solo los que contenga
 * @param {Object} obj
 * @param {Object} obj.movie - Objeto a verificar
 * @returns {Promise<Object>} - Devuelve una promesa que se resuelve con un objeto que contiene success y data
 */
const verifyPartialMovie = async ({ movie }) =>
  await movieSchema.partial().safeParseAsync(movie);

export default { verifyMovie, verifyPartialMovie };
