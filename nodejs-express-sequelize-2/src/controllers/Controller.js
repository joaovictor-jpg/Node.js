class Controller {
  constructor(entidadeService) {
    this.entidadeService = entidadeService;
  }

  async pegaTodos(_, res) {
    try {
      const listaRegistro = await this.entidadeService.pegarTodosOsRegistros();
      return res.status(200).json(listaRegistro);
    } catch (erro) {
      // errors
    }
  }

  async buscarPorid(req, res) {
    const { id } = req.params;
    try {
      const pessoa = await this.entidadeService.buscarPorId(Number(id));
      return res.status(200).json(pessoa);
    } catch (erro) {
      //errors
    }
  }

  async cadastrarPessoa(req, res) {
    const dadosParaCriacao = req.body;
    try {
      const pessoa = await this.entidadeService.criarPessoa(dadosParaCriacao);
      return res.status(201).json(pessoa);
    } catch (erro) {
      //erro
    }
  }

  async atualizar(req, res) {
    const { id } = req.params;
    const dadosPessoas = req.body;
    try {
      const foiAtualizado = await this.entidadeService.atualizarRegistro(dadosPessoas, Number(id));
      if (!foiAtualizado) {
        return res.status(400).json({ message: 'Não foi atualizado' });
      }
      return res.status(200).json({ message: 'Atualizado com sucesso' });
    } catch (erro) {
      // error
    }
  }

  async deletarPorId(req, res) {
    const { id } = req.params;
    try {
      await this.entidadeService.deletaPessoa(Number(id));
      return res.status(200).json({ mensagem: `id ${id} deletado` });
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  }
}

module.exports = Controller;
