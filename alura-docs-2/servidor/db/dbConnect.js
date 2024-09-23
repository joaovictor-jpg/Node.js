import { MongoClient } from "mongodb";

const Cliente = new MongoClient("mongodb+srv://admin:admin123456@aluracluster.4rckx.mongodb.net/?retryWrites=true&w=majority&appName=aluraCluster");

let documentosColecao;
let usuarioscollection;

try {
  await Cliente.connect();

  const db = Cliente.db("alura-websocket");

  documentosColecao = db.collection("documentos");
  usuarioscollection = db.collection("usuarios");

  console.log("Conectado ao banco de dados com sucesso!");
} catch (erro) {
  console.log(erro);
}

export { documentosColecao, usuarioscollection };
