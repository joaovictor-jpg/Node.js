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
  
  async pegaUmRegistro(where) {
    return await dataSource[this.model].findOne({ where: { ...where } });
  }
  
  async criarPessoa(pessoa) {
    return await dataSource[this.model].create(pessoa);
  }
  
  async atualizarRegistro(dadosAtualizados, where) {
    const ListadeRegistrosAtualizados = dataSource[this.model].update(dadosAtualizados, { where: { ...where } });
    if (ListadeRegistrosAtualizados[0] === 0) {
      return false;
    }
    return true;
  }

  async deletaPessoa(where) {
    return dataSource[this.model].destroy({ where: { ...where } });
  }

}


module.exports = Services;