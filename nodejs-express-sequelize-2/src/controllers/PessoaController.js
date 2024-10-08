const Controller = require('./Controller.js');
const PessoaServices = require('../services/PessoaServices.js');


const pessoaServices = new PessoaServices();

class PessoaController extends Controller {
  constructor() {
    super(pessoaServices);
  }

  async pegaMatriculasAtivas(req, res) {
    const { estudante_id } = req.params;
    try {
      const listaMatriculas = await pessoaServices.pegaMatriculasAtivasPorEstudante(Number(estudante_id));
      return res.status(200).json(listaMatriculas);
    } catch (erro) {
      return res.status(500).json({ mensagem: erro.message });
    }
  }

  async pegaTodasAsMatriculas(req, res) {
    const { estudante_id } = req.params;
    try {
      const listaMatriculas = await pessoaServices.pegaTodasAsMatriculasAtivasPorEstudante(Number(estudante_id));
      return res.status(200).json(listaMatriculas);
    } catch (erro) {
      return res.status(500).json({ mensagem: erro.message });
    }
  }

  async pegaTodasAsPessoas(req, res) {
    try {
      const listaTodasAsPessoas = await pessoaServices.pegaPessoasEscopoTodos();
      return res.status(200).json(listaTodasAsPessoas);
    } catch (erro) {
      return res.status(500).json({ mensagem: erro.message });
    }
  }

  async cancelaRegistroEstudante(req, res) {
    const { estudanteid } = req.params;
    console.log(estudanteid);
    try {
      await pessoaServices.cancelaPessoaEMatricula(Number(estudanteid));
      return res.status(200).json({ mensagem: `Matrículas ref. estudante ${estudanteid} canceladas` });
    } catch (erro) {
      return res.status(500).json({ mensagem: erro.message });
    }
  }
}

module.exports = PessoaController;