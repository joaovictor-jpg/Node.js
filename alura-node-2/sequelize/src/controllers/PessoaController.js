const PessoaService = require('../serveces/PessoaService');
const Controller = require('./Controller');

class PessoaController extends Controller {
  constructor() {
    super(new PessoaService());
  }
}

module.exports = PessoaController;