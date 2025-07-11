import RequisicaoIncorreta from "./RequisicaoIncorreta.js";

class ErroValidacao extends RequisicaoIncorreta {
  constructor(error) {
    const mensagensError = Object.values(error.errors).map(erro => erro.message).join("; ");
    super(`Os seguintes errors foram encontrados: ${mensagensError}`);
  }
}

export default ErroValidacao;
