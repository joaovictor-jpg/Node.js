const dataSource = require('../dataBase/models');

class Services {
  constructor(nomeDeModule) {
    this.model = nomeDeModule;
  }

  async pegarTodosOsRegistros() {
    return dataSource[this.model].findAll();
  }

  async pegaRegistroPorEscopo (escopo) {
    return dataSource[this.model].scope(escopo).findAll();
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

  async deletaPessoa(id) {
    return dataSource[this.model].destroy({ where: { id: id } });
  }

}


module.exports = Services;