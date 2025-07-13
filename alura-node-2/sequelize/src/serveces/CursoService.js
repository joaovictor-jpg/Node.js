const Service = require('./Service');

class CursoService extends Service {
  constructor() {
    super('Curso');
  }

  async pegaTodasAsPessoas() {
    return await this.pegaTodosOsRegistros();
  }
}

module.exports = CursoService;