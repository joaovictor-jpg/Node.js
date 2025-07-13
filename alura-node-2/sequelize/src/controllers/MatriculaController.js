const MatriculaService = require('../serveces/MatriculaService.js');
const Controller = require('./Controller.js');

class MatriculaController extends Controller {
  constructor() {
    super(new MatriculaService());
  }
}

module.exports = MatriculaController;