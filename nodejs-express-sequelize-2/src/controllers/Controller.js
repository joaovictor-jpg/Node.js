const convertId = require('../utils/conversorDeStringHelper.js');

class Controller {
  constructor(entidadeService) {
    this.entidadeService = entidadeService;
  }

  async pegaTodos(_, res) {
    try {
      const listaRegistro = await this.entidadeService.pegarTodosOsRegistros();
      return res.status(200).json(listaRegistro);
    } catch (erro) {
      return res.status(500).json({ mensagem: erro.message });
    }
  }

  async buscarPorid(req, res) {
    const { id } = req.params;
    try {
      const pessoa = await this.entidadeService.buscarPorId(Number(id));
      return res.status(200).json(pessoa);
    } catch (erro) {
      return res.status(500).json({ mensagem: erro.message });
    }
  }

  async pegaUm(req, res) {
    const { ...params } = req.params;
    const where = convertId(params);
    try {
      const pessoa = await this.entidadeService.pegaUmRegistro(where);
      return res.status(200).json(pessoa);
    } catch (erro) {
      return res.status(500).json({ mensagem: erro.message });
    }
  }

  async cadastrarPessoa(req, res) {
    const dadosParaCriacao = req.body;
    try {
      const pessoa = await this.entidadeService.criarPessoa(dadosParaCriacao);
      return res.status(201).json(pessoa);
    } catch (erro) {
      return res.status(500).json({ mensagem: erro.message });
    }
  }

  async atualizar(req, res) {
    const { ...param } = req.params;
    const dadosPessoas = req.body;
    const where = convertId(param);
    try {
      const foiAtualizado = await this.entidadeService.atualizarRegistro(dadosPessoas, where);
      if (!foiAtualizado) {
        return res.status(400).json({ message: 'Não foi atualizado' });
      }
      return res.status(200).json({ message: 'Atualizado com sucesso' });
    } catch (erro) {
      return res.status(500).json({ mensagem: erro.message });
    }
  }

  async deletarPorId(req, res) {
    const { ...param } = req.params;
    const where = convertId(param);
    try {
      await this.entidadeService.deletaPessoa(where);
      return res.status(200).json({ mensagem: `id ${id} deletado` });
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  }
}

module.exports = Controller;
