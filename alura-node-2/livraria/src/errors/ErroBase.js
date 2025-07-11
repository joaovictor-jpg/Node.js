class ErroBase extends Error {
  constructor(message = "Error interno do servidor", status = 500) {
    super();
    this.message = message;
    this.status = status;
  }

  enviarResposta(res) {
    res.status(this.status).send({mensage: this.message, status: this.status});
  }
}

export default ErroBase;