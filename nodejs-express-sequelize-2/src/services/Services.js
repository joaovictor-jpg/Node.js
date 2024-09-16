const dataSource = require('../models');

class Services {
  constructor(nomeDeModule) {
    this.model = nomeDeModule;
  }

  async pegarTodosOsRegistros() {
    return dataSource[this.model].findAll();
  }

  async buscarPorId(id) {
    return await dataSource[this.model].findByPk(id);
  }
  
  async criarPessoa(pessoa) {
    return await dataSource[this.model].create(pessoa);
  }
  
  async atualizarRegistro(dadosAtualizados, id) {
    const ListadeRegistrosAtualizados = dataSource[this.model].update(dadosAtualizados, { where: { id: id } });
    if (ListadeRegistrosAtualizados[0] === 0) {
      return false;
    }
    return true;
  }

}


module.exports = Services;