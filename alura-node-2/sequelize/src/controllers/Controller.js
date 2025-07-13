class Controller {
  constructor(entidadeService) {
    this.service = entidadeService;
  };

  async pegaTodas(req, res) {
    try {
      const lista = await this.service.pegaTodosOsRegistros();
      return res.status(200).json(lista);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async pegaUmPorId(req, res) {
    const { id } = req.params;
    try {
      const umRegistro = await this.service.pegaUmRegistroPorId(Number(id));
      return res.status(200).json(umRegistro);
    } catch(error) {
      // erro
    }
  }

  async criaNovo(req, res) {
    const dadosParaCriacao = req.body;
    try {
      const novoRegistroCriado = await this.service.criaRegistro(dadosParaCriacao);
      return res.status(200).json(novoRegistroCriado);
    } catch(error) {
      // error
    }
  }

  async atuliza(req, res) {
    const { id } = req.params;
    const dadosAtualizados = req.body;
    try {
      const foiAtualizado = await this.service.atualizaRegistro(Number(id), dadosAtualizados);
      if (!foiAtualizado) {
        return res.status(400).json({message: 'registro não foi atualizado'});
      }

      return res.status(200).send({message: 'Atualizado com sucesso'});
    } catch(error) {
      // error
    }
  }

  async exclui(req, res) {
    const { id } = req.params;
    try {
      await this.service.excluirRegistro(Number(id));
      return res.status(200).json({message: `Id ${id} deletado com sucesso.`});
    } catch(error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = Controller;