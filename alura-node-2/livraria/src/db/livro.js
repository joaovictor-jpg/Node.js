import mongoose from "mongoose";
import { autorSchema } from "./Autor.js";

// 1. Definimos o "Schema", que é a estrutura do nosso documento.
const livroSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId }, // O id é gerado automaticamente pelo MongoDB
  titulo: { type: String, required: [true, "O título do livro é obrigatório"] },
  autor: autorSchema,
  editora: {
    type: String, required: [true, "A editora é obrigatória"], enum: {
      values: ["Casa do código", "Alura"],
      message: "A editora {VALUE} não é um valor permitido."
    }
  },
  numeroPaginas: {
    type: Number,
    validate: {
      validator: (valor) => {
        return valor >= 10 && valor <= 5000;
      },
      message: "O número de página deve estar entre 10 e 5000."
    }
  }
}, { versionKey: false }); // versionKey: false para não criar o campo "__v" no documento

// 2. Criamos o "Model", que é a nossa interface para interagir com a coleção "livros" no banco.
const Livro = mongoose.model("livros", livroSchema);

export default Livro;