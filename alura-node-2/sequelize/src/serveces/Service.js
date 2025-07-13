const dataBase = require('../models');

class Service {
  constructor(nomeDaModel) {
    this.model = nomeDaModel;
  }

  async pegaTodosOsRegistros() {
    return await dataBase[this.model].findAll();
  }

  async pegaUmRegistroPorId(id) {    
    const pessoa = dataBase[this.model].findByPk(id);
    return pessoa;
  }

  async criaRegistro(dadosDoRegistro) {
    return dataBase[this.model].create(dadosDoRegistro);
  }

  async atualizaRegistro(id, dadosAtualizados) {
    const listaRegistrosAtualizados = dataBase[this.model].update(dadosAtualizados, {
      where: {
        id: id
      }
    });

    if (listaRegistrosAtualizados[0] === 0) {
      return false;
    }

    return true;
  }

  async excluirRegistro(id) {
    return dataBase[this.model].destroy({
      where: {
        id: id
      }
    });
  }
}

module.exports = Service;