import { inserirLinkDocumento } from "../index.js";

const socket = io();

socket.emit("obter_documentos", (listaDocumentos) => {
    listaDocumentos.forEach(documento => {
        inserirLinkDocumento(documento.nome);
    });
});

function emitirDocumento(documento) {
    socket.emit("gravarDocumento", documento);
};

socket.on("adicionar_documento_interface", (documento) => {
    inserirLinkDocumento(documento);
});

socket.on("documento_existente", (nomeDocumento) => {
    alert(`O documento ${nomeDocumento} já existe`);
});

export { emitirDocumento };