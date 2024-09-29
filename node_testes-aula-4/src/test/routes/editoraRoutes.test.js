import request from 'supertest';
import { describe, expect, jest } from '@jest/globals';
import app from '../../app.js';

let server;

beforeEach(() => {
  const port = 3000;
  server = app.listen(port);
});

afterEach(() => {
  server.close();
});

describe('GET em /editoras', () => {
  it('Deve retorna uma lista de editoras', async () => {
    const resposta = await request(app)
      .get('/editoras')
      .set('accept', 'application/json')
      .expect('content-type', /json/)
      .expect(200);

    expect(resposta.body[0].email).toEqual('e@e.com');
  });
});

let idResposta;

describe('POST em /editora', () => {
  it('Deve adicionar uma nova editora', async () => {
    const resposta = await request(app).post('/editoras').send({ nome: 'CDC', cidade: 'Rio de Janeiro', email: 's@s.com' }).expect(201);
    idResposta = resposta.body.content.id;
    expect(resposta.body.content.email).toEqual('s@s.com');
  });
  it('Não deve adicionar nada ao passar o body vazio', async () => {
    await request(app)
      .post('/editoras')
      .send({})
      .expect(400);
  });
});

describe('GET recuperar editora pelo id', () => {
  it('Deve retorna uma editora por id', async () => {
    const resposta = await request(app)
      .get(`/editoras/${idResposta}`)
      .expect(200);

    expect(resposta.body.email).toEqual('s@s.com');
  });
});

describe('PUT atualizar nome da editora', () => {
  test.each([
    ['nome', { nome: 'Casa do Código' }],
    ['cidade', { cidade: 'SP' }],
    ['email', { email: 'cdc@cdc.com' }],
  ])('Deve Atualizar o %s da editora', async (param) => {
    const requisicao = { request };
    const spy = jest.spyOn(requisicao, 'request');
    await requisicao.request(app)
      .put(`/editoras/${idResposta}`)
      .send(param)
      .expect(204);

    expect(spy).toHaveBeenCalled();
  });
});

describe('DELETE em /editoras/id', () => {
  it('DELETE o recurso adicionado', async () => {
    await request(app).delete(`/editoras/${idResposta}`)
      .expect(200);
  });
});
