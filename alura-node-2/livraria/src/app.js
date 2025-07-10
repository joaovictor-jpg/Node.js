import express from "express";
import conectarNaDataBase from "./db/dbConnect.js";
import routes from "./routes/index.js";

const conexao = await conectarNaDataBase();

conexao.on("error", (erro) => {
    console.error("Error de conexão: ", erro);    
});

conexao.once("open", () => {
    console.log("Conexão com o banco com sucesso!");    
});

const app = express();

routes(app);

export default app;