const PessoaService = require('../serveces/PessoaService');
const Controller = require('./Controller');

const pessoaService = new PessoaService();

class PessoaController extends Controller {
  constructor() {
    super(pessoaService);
  }

  async pegaMatriculasAtiva(req, res) {
    const { estudante_id } = req.params;
    try {
      const listaMatricula = await pessoaService.pegaMatriculasAtivaPorEstudante(Number(estudante_id));
      return res.status(200).json(listaMatricula);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async pegaTodasAsMatriculas(req, res) {
    const { estudante_idd } = req.params;
    try {
      const listaMatricula = await pessoaService.pegaTodasAsMatriculasPorEstudante(Number(estudante_idd));
      return res.status(200).json(listaMatricula);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async pegaTodasAsPessoas(req, res) {
    try {
      const listaTodasAsPessoas = await pessoaService.pegaPessoasEscopoTodos();
      return res.status(200).json(listaTodasAsPessoas);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  }

  async cancelaRegistroEstudante(req, res) {
    const { estudante_id } = req.params;
    try {
      await pessoaService.cancelaPessoaEMatriculas(Number(estudante_id));
      return res.status(200).json({ message: `Matrículas ref. estudante ${estudante_id} canceladas` });
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  }
}

module.exports = PessoaController;