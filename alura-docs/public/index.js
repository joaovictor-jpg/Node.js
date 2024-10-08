import { emitirDocumento } from "./socket/socket-front-index.js";

const listaDocumentos = document.getElementById("lista-documentos");
const form = document.getElementById("form-adiciona-documento");
const input = document.getElementById("input-documento");

form.addEventListener("submit", (evento) => {
    evento.preventDefault();
    emitirDocumento(input.value);
    input.value = "";
})

function inserirLinkDocumento(nomeDocumento) {
    listaDocumentos.innerHTML += `
        <a href="documento.html?nome=${nomeDocumento}" class="list-group-item list-group-item-action" id="documento-${nomeDocumento}">
            ${nomeDocumento}
        </a>
    `;
};

function removeLinkDocumento(nomeDocumento) {
    const  documento = document.getElementById(`documento-${nomeDocumento}`);
    listaDocumentos.removeChild(documento);
}

export { inserirLinkDocumento, removeLinkDocumento };