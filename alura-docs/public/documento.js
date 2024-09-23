import { emitirTextoEditor } from "./socket/socket-front-documento.js";

const textoEditor = document.getElementById("editor-texto");

textoEditor.addEventListener("keyup", () => {
    emitirTextoEditor(textoEditor.value);
});

export function atualizaTextoEditor(texto) {
    textoEditor.textContent = texto;
}