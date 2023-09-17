/**
 * En esta clase se encontraran los metodos encargados de manejar las peticiones
 */
class MovieController {
  constructor({ movieMovel }) {
    this.movieMovel = movieMovel;
  }

  getAll = async (req, res) => {
    const {limit, page, genre} = req.query
    const resultado = await this.movieMovel.getAll({ limit, page, genre});
    res.json(resultado);
  };

  //TODO: hacer resto de metodos
  getByID = async (req, res) => {
    const { id } = req.params;
    const resultado = await this.movieMovel.getByID({ id });
    res.json(resultado);
  };
  delete = async (req, res) => {
    const {id} = req.params
    const resultado = await this.movieMovel.delete({ id })
    res.send(resultado)
  };
  update = async (req, res) => {
    const { id } = req.params
    const { movie } = req.body
    const resultado = await this.movieMovel.update({ id, movie })
    res.send(resultado)
  };
  create = async (req, res) => {
    const { movie } = req.body
    const resultado = await this.movieMovel.create({ movie })
    return res.json(resultado)
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
