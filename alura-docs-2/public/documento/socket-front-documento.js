import { obterCookie } from "../utils/cookies.js";
import { alertarERedirecionar, atualizarInterfaceUsuarios, atualizaTextoEditor, tratarAutorizacaoSucesso } from "./documento.js";

const socket = io("/usuarios", {
  auth: {
    token: obterCookie("tokenJwt")
  }
});


function selecionarDocumento(dadosDeEntrada) {
  socket.emit("selecionar_documento", dadosDeEntrada, (texto) => {
    atualizaTextoEditor(texto);
  });
}

function emitirTextoEditor(dados) {
  socket.emit("texto_editor", dados);
}

socket.on("usuario_ja_no_documento", () => {
  alert("Documento já aberto em outra página");
  window.location.href = "/";
});

socket.on("usuarios_no_documento", atualizarInterfaceUsuarios);

socket.on("autorizacao_sucesso", tratarAutorizacaoSucesso);

socket.on("texto_editor_clientes", (texto) => {
  atualizaTextoEditor(texto);
});

function emitirExcluirDocumento(nome) {
  socket.emit("excluir_documento", nome);
}

socket.on("connect_error", (erro) => {
  alert(erro);
  window.location.href = "/login/index.html";
});

socket.on("excluir_documento_sucesso", (nome) => {
  alertarERedirecionar(nome);
});

export { emitirTextoEditor, selecionarDocumento, emitirExcluirDocumento };
