const dataBase = require('../models');

class PessoaController {
  static async pegaTodas(req, res) {
    try {
      const listaPessoas = await dataBase.Pessoa.findAll();
      return res.status(200).json(listaPessoas);
    } catch (erro) {
      // error
    }
  }
}

module.exports = PessoaController;