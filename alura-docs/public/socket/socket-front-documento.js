import { alertaERedirecionar, atualizaTextoEditor } from "../documento.js";

const socket = io();

export function selecionarDocumento(nome) {
    socket.emit("selecionar_documento", nome, (texto) => {
        atualizaTextoEditor(texto);
    });
};

export function emitirTextoEditor(dados) {
    socket.emit("texto_editor", dados);
};

export function emitirExcluirDocumento(nomeDocumento) {
    socket.emit("excluir_documento", nomeDocumento);
}

socket.on("texto_documento", (texto) => {
    atualizaTextoEditor(texto);
})

socket.on("texto_editor_clientes", (texto) => {
    atualizaTextoEditor(texto);
});

socket.on("disconnect", (motivo) => {
    console.log(`Servidor desconectado!
    Motivo: ${motivo}`);
});

socket.on("excluir_documento_sucesso", (nomeDocumento) => {
    alertaERedirecionar(nomeDocumento);
});