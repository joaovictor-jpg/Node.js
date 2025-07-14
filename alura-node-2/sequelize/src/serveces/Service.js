const dataBase = require('../database/models');

class Service {
  constructor(nomeDaModel) {
    this.model = nomeDaModel;
  }

  async pegaTodosOsRegistros(where = {}) {
    return await dataBase[this.model].findAll({where: { ...where }});
  }

  async pegaRegistroPorEscopo(escopo) {
    return dataBase[this.model].scope(escopo).findAll();
  }

  async pegaUmRegistroPorId(id) {
    const registro = dataBase[this.model].findByPk(id);
    return registro;
  }

  async pegaUmRegistro(where) {
    const registro = dataBase[this.model].findOne({ where: { ...where } });
    return registro;
  }

  async pegaEContaRegistros(options) {
    return dataBase[this.model].findAndCountAll({ ...options });
  }

  async criaRegistro(dadosDoRegistro) {
    return dataBase[this.model].create(dadosDoRegistro);
  }

  async atualizaRegistro(where, dadosAtualizados, transacao = {}) {
    const listaRegistrosAtualizados = dataBase[this.model].update(dadosAtualizados, {
      where: { ...where },
      transaction: transacao
    });

    if (listaRegistrosAtualizados[0] === 0) {
      return false;
    }

    return true;
  }

  async excluirRegistro(where) {
    return dataBase[this.model].destroy({
      where: { ...where }
    });
  }
}

module.exports = Service;