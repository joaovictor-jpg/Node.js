import { emitirAdicionarDocumento } from "./socket-front-index.js";
import { obterCookie, removeCookie } from "./utils/cookies.js";

const listaDocumentos = document.getElementById("lista-documentos");
const form = document.getElementById("form-adiciona-documento");
const inputDocumento = document.getElementById("input-documento");
const botaoLogout = document.getElementById("botao-logout");

const tokenJwt = obterCookie("tokenJwt");

form.addEventListener("submit", (evento) => {
  evento.preventDefault();
  emitirAdicionarDocumento(inputDocumento.value);
  inputDocumento.value = "";
});

botaoLogout.addEventListener("click", () => {
  removeCookie("tokenJwt");
  alert("Usuário removido com sucesso!");
  window.location.href = "/login/index.html";
});

function inserirLinkDocumento(nomeDocumento) {
  listaDocumentos.innerHTML += `
    <a
      href="/documento/index.html?nome=${nomeDocumento}"
      class="list-group-item list-group-item-action"
      id="documento-${nomeDocumento}"
    >
      ${nomeDocumento}
    </a>
  `;
}

function removerLinkDocumento(nomeDocumento) {
  const documento = document.getElementById(`documento-${nomeDocumento}`);

  listaDocumentos.removeChild(documento);
}

export { inserirLinkDocumento, removerLinkDocumento };
