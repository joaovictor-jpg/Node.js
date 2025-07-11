import NaoEncontrado from "../errors/NaoEncontrado.js";

function manupulador404(req, res, next) {
  const error404 = new NaoEncontrado();
  next(error404);
}


export default manupulador404;