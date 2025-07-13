const CategoriaService = require('../serveces/CategoriaService.js');
const Controller = require('./Controller');

class CategoriaController extends Controller {
  constructor() {
    super(new CategoriaService());
  }
}

module.exports = CategoriaController;