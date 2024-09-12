import RequicicaoIncorreta from "./RequicicaoIncorreta.js";

class ErrorValidacao extends RequicicaoIncorreta {
  constructor(error) {
    const mensagensErro = Object.values(error.errors)
      .map(erro => erro.message)
      .join(";");
    super(`Os seguintes erros foram encontrados: ${mensagensErro}`);
  }
}

export default ErrorValidacao;