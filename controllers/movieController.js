/**
 * En esta clase se encontraran los metodos encargados de manejar las peticiones
 */
class MovieController {
  constructor({ MovieModel }) {
    this.movieModel = MovieModel;
  }

  getAll = async (req, res) => {
    const { limit, page, genre } = req.query;
    const resultado = await this.movieModel.getAll({ limit, page, genre });
    res.json(resultado);
  };

  getByID = async (req, res) => {
    const { id } = req.params;
    const resultado = await this.movieModel.getByID({ id });
    res.json(resultado);
  };
  delete = async (req, res) => {
    const { id } = req.params;
    const resultado = await this.movieModel.delete({ id });
    res.send(resultado);
  };
  update = async (req, res) => {
    const { id } = req.params;
    const movie = req.body;
    const resultado = await this.movieModel.update({ id, movie });
    res.send(resultado);
  };
  create = async (req, res) => {
    const movie = req.body;
    const resultado = await this.movieModel.create({ movie });
    return res.json(resultado);
  };
  options = async (req, res, next) => {
    res.setHeader(
      "Access-Control-Allow-Methods",
      "OPTIONS, GET, POST, PUT, DELETE"
    );
    next();
  };
}

export default MovieController;
