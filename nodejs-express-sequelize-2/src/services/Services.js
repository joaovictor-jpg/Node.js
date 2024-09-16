const dataSource = require('../models');

class Services {
  constructor(nomeDeModule) {
    this.model = nomeDeModule;
  }

  async pegarTodosOsRegistros() {
    return dataSource[this.model].findAll();
  }
}


module.exports = Services;