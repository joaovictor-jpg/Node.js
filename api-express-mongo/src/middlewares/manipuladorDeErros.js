import mongoose from "mongoose";
import ErrorsBase from "../errors/errorsBase.js";
import RequicicaoIncorreta from "../errors/RequicicaoIncorreta.js";
import ErrorValidacao from "../errors/ErrorValidacao.js";

// eslint-disable-next-line no-unused-vars
function manipuladorDeErros(error, _, res, next) {
  console.log(error); // imprime o erro para a pessoa desenvolvedora
  if (error instanceof mongoose.Error.CastError) {
    new RequicicaoIncorreta().enviarResposta(res);
  } else if (error instanceof mongoose.Error.ValidationError) {
    new ErrorValidacao(error).enviarResposta(res);
  } else if(error instanceof ErrorsBase) {
    error.enviarResposta(res);
  } else {
    new ErrorsBase().enviarResposta(res);
  }
};

export default manipuladorDeErros;