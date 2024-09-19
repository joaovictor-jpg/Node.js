const Controller = require('./Controller');
const CategoriaServices = require('../services/CategoriaServices.js');

const categoriaController = new CategoriaServices();

class CategoriaController extends Controller {
  constructor() {
    super(categoriaController);
  }
}

module.exports = CategoriaController;