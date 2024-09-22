const dataSource = require('../dataBase/models');
const Services = require('./Services.js');

class PessoaServices extends Services {
  constructor() {
    super('Pessoa');
    this.matricula = new Services('Matricula');
  }

  async pegaMatriculasAtivasPorEstudante(id) {
    const estudante = await super.buscarPorId(id);
    const listaMatriculas = await estudante.getAulasMatriculadas();
    return listaMatriculas;
  }

  async pegaPessoasEscopoTodos() {
    const listaPessoas = await super.pegaRegistroPorEscopo('todosOsRegistros');
    return listaPessoas;
  }

  async pegaTodasAsMatriculasAtivasPorEstudante(id) {
    const estudante = await super.buscarPorId(id);
    const listaMatriculas = await estudante.getTodasAsMatriculas();
    return listaMatriculas;
  }

  async cancelaPessoaEMatricula(estudanteid) {
    return dataSource.sequelize.transaction(async (transacao) => {
      await super.atualizarRegistro({ ativo: false }, { id: estudanteid }, transacao);
      await this.matricula.atualizarRegistro({ status: false }, { estudante_id: estudanteid }, transacao);
    });
  }
}

module.exports = PessoaServices;