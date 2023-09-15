//@ts-check
import importJson from "../../utils/importJson.js";
const movies = importJson({ pathJson: "../json/movies.json" });
const genreId = importJson({ pathJson: "../json/genre-id.json" });

/**
 * Es un modelo que maneja los datos de las peliculas en formato JSON, archivo movies.json
 */
class MovieModel {
  /**
   * Permite obtener todas las peliculas con sus generos especificos y no solo con ID - PRIVADA
   * @returns {Promise<Array<Object>>}
   */
  static #getMoviGen = async () => {
    const generosMap = genreId.reduce((obj, elemento) => {
      if (elemento.id === undefined) return;
      obj[elemento.id] = elemento.name;
      return obj;
    }, {});

    const peliculasConGeneros = movies.map((pelicula) => {
      const generoNombre = pelicula.genre_ids.map((id) => generosMap[id]);
      return { ...pelicula, genres: generoNombre };
    });

    return peliculasConGeneros;
  };

  /**
   * Permite obtener todas las peliculas, ademas de filtrar por genero, pagina o limite
   * @param {Object} obj
   * @param {String} obj.genre
   * @param {Number} obj.page
   * @param {Number} obj.limit
   * @returns {Promise<Array<Object>>} Array de peliculas
   */
  static getAll = async ({ genre, page, limit }) => {
    const peliculasConGeneros = await this.#getMoviGen();
    if (genre)
      return this.#getGenre({ genre, peliculasGenero: peliculasConGeneros });
    if (limit)
      return this.#getLimit({
        page,
        limit,
        peliculasGenero: peliculasConGeneros,
      });

    return peliculasConGeneros;
  };

  /**
   * Permite devolver las peliculas filtradas por un genero - PRIVADO
   * @param {Object} obj
   * @param {String} obj.genre - Genero de la pelicula
   * @param {Array<Object>} obj.peliculasGenero - Array de peliculas con generos
   * @returns {Array<Object>} Array de las peliculas filtradas por un genero
   */
  static #getGenre = ({ genre, peliculasGenero }) =>
    peliculasGenero.filter((pelicula) => pelicula.genres.includes(genre));

  /**
   * Devuelve las peliculas segun la pagina y el limite - PRIVADO
   * @param {Object} obj
   * @param {Number} [obj.page]
   * @param {Number} [obj.limit]
   * @param {Array<Object>} obj.peliculasGenero
   * @returns {Array<Object>}
   */
  static #getLimit = ({ page = 1, limit = 10, peliculasGenero }) => {
    const limitT = page * limit;
    const result = peliculasGenero.slice(limitT - limit, limitT);
    return result;
  };

  static getByID = async () => {};
  static delete = async () => {};
  static update = async () => {};
  static create = async () => {};
}

export default MovieModel;
