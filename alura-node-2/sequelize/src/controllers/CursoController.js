const CursoService = require('../serveces/CursoService.js');
const Controller = require('./Controller.js');

class CursoController extends Controller {
  constructor() {
    super(new CursoService());
  }
}

module.exports = CursoController;