import { emitirCadastrarUsuario } from "./socket-front-cadastrar.js";

const form = document.getElementById("form-cadastro");

form.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const usuario = form["input-usuario"].value;
    const senha = form["input-senha"].value;

    emitirCadastrarUsuario({usuario, senha});
})