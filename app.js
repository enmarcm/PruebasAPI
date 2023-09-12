/**
 * API REST de prueba
 * @author Enmanuel Colina <theenmanuel123@gmail.com>
 */

import express from "express";
import picocolors from "picocolors";
import Middlewares from "./middlewares/middlewares.js";

/**
 * PUERTO USADO PARA EL SERVIDOR
 * @type {number} Puerto
 */
const PORT = process.env.PORT ?? 1234;

const app = express();

app.disable("x-powered-by");
app.use(Middlewares.midCors);

app.get("/", (req, res) => {
  res.send("PAGINA PRINCIPAL");
});

app.use(Middlewares.notFound);

app.listen(PORT, () =>
  console.log(
    picocolors.bgGreen(picocolors.black(`Esperando en el PUERTO ${PORT}`))
  )
);
