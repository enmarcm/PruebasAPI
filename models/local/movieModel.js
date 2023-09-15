//@ts-check
import movieSchema from "../../schemas/movieSchema.js";
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

  /**
   * Obtener una pelicula mediante su ID
   * @param {Object} obj
   * @param {String} obj.id - ID de la pelicula, es un UUID
   * @returns {Promise<Object | Boolean> } - Pelicula o false, si no se encuentra
   */
  static getByID = async ({ id }) => {
    const movies = await this.#getMoviGen();
    const resultado = movies.find((movie) => movie.id === id);  //TODO:: CREAR METODOS PARA OBTENER EL ID

    if (resultado === -1) return false;
    return resultado;
  };

  /**
   * Permite borrar una de las peliculas mediante su ID
   * @param {Object} obj
   * @param {String} obj.id - ID de la pelicula, es un UUID
   * @returns {Promise<Object | Boolean> } - Pelicula o false, si no se encuentra
   */
  static delete = async ({ id }) => {
    const index = movies.findIndex((movie) => movie.id === id);
    if (index === -1) return false;

    const result = movies.splice(index, 1);
    return result;
  };

  /**
   * Permite actualizar parcialmente una pelicula
   * @param {Object} obj
   * @param {Number} obj.id Es el identificador de la pelicula
   * @param {Object} obj.movie Objeto de pelicula
   * @returns {Promise<Object | Boolean>} El objeto recien modificado o un false
   */
  static update = async ({ id, movie }) => {
    const index = movies.findIndex((movie) => movie.id === id);
    if (index === -1) return false;

    const result = await movieSchema.verifyPartialMovie({ movie });
    if (!result.success) return false;

    const final = {
      ...movie[index],
      ...result.data,
    };

    movie[index] = final;

    return final;
  };

  /**
   * Crea un nuevo objeto en el Array de peliculas
   * @param {Object} obj
   * @param {Object} obj.movie Objeto de la pelicula
   * @returns {Promise<Object | Boolean>}
   */
  static create = async ({ movie }) => {
    const newMovie = await movieSchema.verifyMovie({ movie });
    if (!newMovie.success) return false;

    movies.push(newMovie.data);

    return newMovie.data;
  };
}

export default MovieModel;
