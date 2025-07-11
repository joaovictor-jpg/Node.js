import mongoose from "mongoose";

const autorSchema = new mongoose.Schema({
  id: {type: mongoose.Schema.ObjectId},
  nome: {type: String, required: [true, "O nome do(a) autor(a) é obrigatório"]},
  nacionalidade: {type: String}
}, {versionKey: false});

const Autor = mongoose.model("autores", autorSchema);

export {Autor, autorSchema};