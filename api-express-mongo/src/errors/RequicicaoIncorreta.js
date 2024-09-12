import ErrorsBase from "./errorsBase.js";

class RequicicaoIncorreta extends ErrorsBase {
  constructor(mensagem = "Um ou mais dados fornecidos estão incorretos",) {
    super(mensagem, 400);
  }
}

export default RequicicaoIncorreta;