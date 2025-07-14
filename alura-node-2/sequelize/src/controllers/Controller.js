const converteIds = require('../utils/conversoDeStringHelp.js');

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
      return res.status(500).json({ error: error.message });
    }
  }

  async pegaUm(req, res) {
    const { ...params } = req.params;
    const where = converteIds(params);
    try {
      const umRegistro = await this.service.pegaUm(where);
      return res.status(200).json(umRegistro);
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  }

  async criaNovo(req, res) {
    const dadosParaCriacao = req.body;
    try {
      const novoRegistroCriado = await this.service.criaRegistro(dadosParaCriacao);
      return res.status(200).json(novoRegistroCriado);
    } catch(error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async atuliza(req, res) {
    const { ...params } = req.params;
    const dadosAtualizados = req.body;
    const where = converteIds(params);
    try {
      const foiAtualizado = await this.service.atualizaRegistro(where, dadosAtualizados);
      if (!foiAtualizado) {
        return res.status(400).json({message: 'registro não foi atualizado'});
      }

      return res.status(200).send({message: 'Atualizado com sucesso'});
    } catch(error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async exclui(req, res) {
    const { ...params } = req.params;
    const where = converteIds(params);
    try {
      await this.service.excluirRegistro(where);
      return res.status(200).json({message: `Id ${where.id} deletado com sucesso.`});
    } catch(error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = Controller;