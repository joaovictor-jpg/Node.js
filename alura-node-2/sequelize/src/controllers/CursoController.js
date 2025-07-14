const { Op } = require('sequelize');
const CursoService = require('../serveces/CursoService.js');
const Controller = require('./Controller.js');

const cursoService = new CursoService();

class CursoController extends Controller {
  constructor() {
    super(cursoService);
  }

  async pegaCurso(req, res) {
    const { data_inicial, data_final } = req.query;
    const where = {};

    data_inicial || data_final ? where.data_inicio = {} : null;
    data_inicial ? where.data_inicio[Op.gte] = data_inicial : null;
    data_final ? where.data_inicio[Op.lte] = data_final : null;

    try {
      const listaCursos = await cursoService.pegaTodosOsRegistros(where);
      return res.status(200).json(listaCursos);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = CursoController;