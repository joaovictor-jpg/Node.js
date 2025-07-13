const Service = require('./Service');

class PessoaService extends Service {
  constructor() {
    super('Pessoa');
  }

  async pegaTodasAsPessoas() {
    return await this.pegaTodosOsRegistros();
  }
}

module.exports = PessoaService;