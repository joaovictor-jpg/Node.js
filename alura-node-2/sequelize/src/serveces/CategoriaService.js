const Service = require('./Service');

class CategoriaService extends Service {
  constructor() {
    super('Categoria');
  }

  async pegaTodasAsPessoas() {
    return await this.pegaTodosOsRegistros();
  }
}

module.exports = CategoriaService;