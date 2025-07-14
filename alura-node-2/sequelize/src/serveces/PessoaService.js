const Service = require('./Service');
const dataSource = require('../database/models');

class PessoaService extends Service {
  constructor() {
    super('Pessoa');
    this.matriculaService = new Service('Matricula');
  }

  async pegaMatriculasAtivaPorEstudante(estudanteId) {
    const estudante = await super.pegaUmRegistroPorId(estudanteId);
    const listaMatriculas = await estudante.getAulasMatriculadas();
    return listaMatriculas;
  }

  async pegaTodasAsMatriculasPorEstudante(estudanteId) {
    const estudante = await super.pegaUmRegistroPorId(estudanteId);
    const listaMatriculas = await estudante.getTodasAsMatriculas();
    return listaMatriculas;
  }

  async pegaPessoasEscopoTodos() {
    const listaPessoa = await super.pegaRegistroPorEscopo('todosOsRegistros');
    return listaPessoa;
  }

  async cancelaPessoaEMatriculas(estudanteId) {
    return dataSource.sequelize.transaction(async (transacao) => {
      await super.atualizaRegistro({ id: estudanteId }, { ativo: false }, transacao);
      await this.matriculaServices.atualizaRegistro({ estudante_id: estudanteId}, { status: 'cancelado' }, transacao);
    });
  }
}

module.exports = PessoaService;