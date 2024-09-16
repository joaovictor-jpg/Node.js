class Controller {
  constructor(entidadeService) {
    this.entidadeService = entidadeService;
  }

  async pegaTodos(req, res) {
    try {
      const listaRegistro = await this.entidadeService.pegarTodosOsRegistros();
      return res.status(200).json(listaRegistro);
    } catch (erro) {
      // errors
    }
  }
}

module.exports = Controller;
