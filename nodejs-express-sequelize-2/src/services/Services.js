const dataSource = require('../dataBase/models');

class Services {
  constructor(nomeDeModule) {
    this.model = nomeDeModule;
  }

  async pegarTodosOsRegistros(where = {}) {
    console.log(where);
    return dataSource[this.model].findAll({ where: { ...where }});
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

  async pegaEContaRegistros(options) {
    return await dataSource[this.model].findAndCountAll({ ...options });
  }
  
  async criarPessoa(pessoa) {
    return await dataSource[this.model].create(pessoa);
  }
  
  async atualizarRegistro(dadosAtualizados, where, transacao = {}) {
    const ListadeRegistrosAtualizados = await dataSource[this.model].update(
      dadosAtualizados,
      { 
        where: { ...where },
        transaction: transacao
      }
    );
    if (ListadeRegistrosAtualizados[0] === 0) {
      return false;
    }
    return true;
  }

  async deletaPessoa(where) {
    return await dataSource[this.model].destroy({ where: { ...where } });
  }

}


module.exports = Services;