const Controller = require('./Controller.js');
const MatriculaServices = require('../services/MatriculaServices.js');

const matriculaServices = new MatriculaServices();

class MatriculaController extends Controller {
  constructor() {
    super(matriculaServices);
  }

  async pegaMatriculasPorEstudante(req, res) {
    const { estudante_id } = req.params;
    try {
      const listaMatriculaPorEstudante = await matriculaServices.pagaEContaRegistros({
        estudante_id: Number(estudante_id),
        status: 'matriculado'
      });
      return res.status(200).json(listaMatriculaPorEstudante);
    } catch (erro) {
      return res.status(500).json({ mensagem: erro.message });
    }
  }
}

module.exports = MatriculaController;
