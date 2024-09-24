import express from "express";
import url from "url";
import path from "path";
import http from "http";
import { Server } from "socket.io";

import "./db/dbConnect.js";

const app = express();
const porta = process.env.porta || 3000;
// const port = process.env.porta || 5000;

const caminhoAtual = url.fileURLToPath(import.meta.url);
const diretorioPublico = path.join(caminhoAtual, "../..", "public");
app.use(express.static(diretorioPublico));

const servidorHttp = http.createServer(app);
// const servidor = http.createServer(app);

servidorHttp.listen(porta, () => console.log(`Servidor escutando na porta ${porta}`));
// servidor.listen(port, () => console.log(`Servidor escutando na porta ${port}`));

const io = new Server(servidorHttp, {
    cors: {
        origin: "http://localhost:5000"
    }
});

export default io;
