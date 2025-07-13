const Service = require('./Service');

class MatriculaService extends Service {
  constructor() {
    super('Matricula');
  }

  async pegaTodasAsPessoas() {
    return await this.pegaTodosOsRegistros();
  }
}

module.exports = MatriculaService;