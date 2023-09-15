/**
 * En esta clase se encontraran los metodos encargados de manejar las peticiones
 */
class MovieController {
  constructor({ movieMovel }) {
    this.movieMovel = movieMovel;
  }

  getAll = async (req, res) => {
    const resultado = await this.movieMovel.getAll();
    res.json(resultado);
  };

  //TODO: hacer resto de metodos
  getByID = async () => {};
  delete = async () => {};
  update = async () => {};
  create = async () => {};
  options = async (req, res, next) => {
    res.setHeader(
      "Access-Control-Allow-Methods",
      "OPTIONS, GET, POST, PUT, DELETE"
    );
    next();
  };
}

export default MovieController;
