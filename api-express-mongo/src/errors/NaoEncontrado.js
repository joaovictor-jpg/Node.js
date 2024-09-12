import ErrorsBase from "./errorsBase.js";

class NaoEncontrado extends ErrorsBase {
  constructor(mensagem = "Página não encontrada") {
    super(mensagem, 404);
  }
}

export default NaoEncontrado;