import express from "express";
import conectarNaDataBase from "./db/dbConnect.js";
import manipuladorDeErrors from "./middlewares/manipuladoDeErros.js";
import routes from "./routes/index.js";
import manupulador404 from "./middlewares/manipulador404.js";

const conexao = await conectarNaDataBase();

conexao.on("error", (erro) => {
  // eslint-disable-next-line no-console
  console.error("Error de conexão: ", erro);
});

conexao.once("open", () => {
  // eslint-disable-next-line no-console
  console.log("Conexão com o banco com sucesso!");
});

const app = express();


routes(app);

app.use(manupulador404);

app.use(manipuladorDeErrors);

export default app;