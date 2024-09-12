import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";

const livroSchema = new mongoose.Schema(
  {
    id: { type: String },
    titulo: { type: String, required: [true, "O título do livro é obrigatório"] },
    autor: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "autores", required: [true, "O Autor(a) é obrigatorio"],
      autopopulate: true
    },
    editora: { type: String, required: [true, "A editora é obrigatoria"], enum: { values: ["Casa do Código", "Alura"], message: "A editora {VALUE} não é um valor permitido." } },
    /*numeroPaginas: { type: Number, min: [10, "O número de página deve estar entre 10 e 5000"], max: [5000, "O número de página deve estar entre 10 e 5000"] },*/
    numeroPaginas: {
      type: Number,
      validate: {
        validator: (valor) => {
          return valor >= 10 && valor <= 5000;
        },
        message: "O número de página deve estar entre 10 e 5000. Você forneceu: {VALUE}"
      }
    }
  }
);

livroSchema.plugin(autopopulate);

const livros = mongoose.model("livros", livroSchema);

export default livros;