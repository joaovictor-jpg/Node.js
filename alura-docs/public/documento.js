import { emitirExcluirDocumento, emitirTextoEditor, selecionarDocumento } from "./socket/socket-front-documento.js";
const tituloDocumento = document.getElementById("titulo-documento");
const excluirDocumento = document.getElementById("excluir-documento");

const parametros = new URLSearchParams(window.location.search);
const nomeDocumento = parametros.get("nome");

const textoEditor = document.getElementById("editor-texto");

tituloDocumento.textContent = nomeDocumento || "Documento sem título";

selecionarDocumento(nomeDocumento);


textoEditor.addEventListener("keyup", () => {
    emitirTextoEditor({
        texto: textoEditor.value,
        nomeDocumento
    });
});

excluirDocumento.addEventListener("click", () => {
    emitirExcluirDocumento(nomeDocumento);
});

export function atualizaTextoEditor(texto) {
    textoEditor.value = texto;
};

export function alertaERedirecionar(nome) {
    if (nomeDocumento === nome) {
        alert(`Documento ${nomeDocumento} foi excluído!`);
        window.location.href = "/";
    }
}