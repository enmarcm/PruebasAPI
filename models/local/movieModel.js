import importJson from "../../utils/importJson.js";
const movies = importJson({ pathJson: "../json/movies.json" });
const genreId = importJson({ pathJson: "../json/genre-id.json" });

class MovieModel {
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

  static getAll = async ({ genre, page, limit }) => {
    if (genre)
      return this.#getGenre({ genre, peliculasGenero: peliculasConGeneros });
    if (limit)
      return this.#getLimit({
        page,
        limit,
        peliculasGenero: peliculasConGeneros,
      });

    const todos = await this.#getMoviGen();
    return todos;
  };

  static #getGenre = ({ genre, peliculasGenero }) =>
    peliculasGenero.filter((pelicula) => pelicula.genres.includes(genre));

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
