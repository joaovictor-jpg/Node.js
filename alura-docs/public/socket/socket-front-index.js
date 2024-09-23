import { inserirLinkDocumento } from "../index.js";

const socket = io();

socket.emit("obter_documentos", (listaDocumentos) => {
    listaDocumentos.forEach(documento => {
        inserirLinkDocumento(documento.nome);
    });
});