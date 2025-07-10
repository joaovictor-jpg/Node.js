import mongoose from "mongoose";
import { autorSchema } from "./Autor.js";

// 1. Definimos o "Schema", que é a estrutura do nosso documento.
const livroSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId }, // O id é gerado automaticamente pelo MongoDB
  title: { type: String, required: true },
  autor: autorSchema,
  editora: {type: String},
  paginas: { type: Number }
}, { versionKey: false }); // versionKey: false para não criar o campo "__v" no documento

// 2. Criamos o "Model", que é a nossa interface para interagir com a coleção "livros" no banco.
const Livro = mongoose.model("livros", livroSchema);

export default Livro;