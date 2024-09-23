import { criarHashSalSenha } from "../utils/criarHashSalSenha.js";
import { usuarioscollection } from "./dbConnect.js";

function cadastrarUsuario({ nome, senha }) {

    const { salSenha, hashSenha } = criarHashSalSenha(senha);

    return usuarioscollection.insertOne({ nome, hashSenha, salSenha });
};

function encontrarUsario(nome) {
    return usuarioscollection.findOne({ nome });
}

export { cadastrarUsuario, encontrarUsario };