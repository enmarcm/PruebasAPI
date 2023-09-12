
/**
 * Clase que contiene los middlewares usados en la aplicacion
 */
class Middlewares {
  /**
   * Un middleware para evitar el error de cors, permitiendo el acceso desde cualquier direccion
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   * @returns {void}
   */
  static midCors = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
  };

  /**
   * Un middleware para devolver un estatus de 404, cuando no encuentre una ruta
   * @param {Object} req
   * @param {Object} res
   * @returns {void}
   */
  static notFound = (req, res) => {
    res
      .status(404)
      .set("content-type", "text/html charset=utf-8")
      .end("ERROR 404: PAGINA NO ENCONTRADA");
  };
}

export default Middlewares;
