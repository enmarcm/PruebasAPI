import importJson from "../../utils/importJson.js";
const movies = importJson({ pathJson: "../json/movies.json" });
const genreId = importJson({ pathJson: "../json/genre-id.json" });

class MovieModel {
  static getAll = async ({ genre, page, limit }) => {
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

  static #getGenre = ({ genre }) => {};

  static #getLimit = ({ page, limit }) => {};

  static getByID = async () => {};
  static delete = async () => {};
  static update = async () => {};
  static create = async () => {};
}

MovieModel.getAll();
