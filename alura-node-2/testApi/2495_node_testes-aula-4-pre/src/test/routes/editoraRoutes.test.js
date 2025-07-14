import {
  afterEach, beforeEach, describe, expect, it,
  jest,
} from '@jest/globals';
import request from 'supertest';
import app from '../../app.js';

let server;
beforeEach(() => {
  const port = 3000;
  server = app.listen(port);
});

afterEach(() => {
  server.close();
});

describe('GET EDITORA', () => {
  it('Deve retorna uma lista de editora', async () => {
    const resposta = await request(app).get('/editoras').set('Accept', 'aplication/json').expect('content-type', /json/)
      .expect(200);

    expect(resposta.body[0].email).toEqual('e@e.com');
  });
});

let idResposta;

describe('POST em /editora', () => {
  it('Deve adicionar uma nova editora', async () => {
    const resposta = await request(app).post('/editoras').send({
      nome: 'cdc',
      cidade: 'São Paulo',
      email: 'teste@com.com',
    }).expect(201);
    idResposta = resposta.body.content.id;
  });

  it('Não deve adicionar editora com corpo vazio', async () => {
    await request(app).post('/editoras').send({}).expect(400);
  });
});

describe('GET em /editora/id', () => {
  it('Deve retorna o recurso selecionado', async () => {
    await request(app).get(`/editoras/${idResposta}`).set('Accept', 'aplication/json').expect('content-type', /json/)
      .expect(200);
  });
});

describe('PUT em /editora/id', () => {
  test.each([
    ['nome', { nome: 'Casa do código' }],
    ['cidade', { cidade: 'SP' }],
    ['email', { email: 'cdc@cdc.com' }],
  ])('Deve atualizar dado da editora: %s', async (chave, params) => {
    const requisicao = { request };

    const spy = jest.spyOn(requisicao, 'request');

    await requisicao.request(app).put(`/editoras/${idResposta}`).send(params).expect(204);

    expect(spy).toHaveBeenCalled();
  });
});

describe('DELETE em /editora/id', () => {
  it('Deletar o recurso adicionado', async () => {
    await request(app).delete(`/editoras/${idResposta}`).expect(200);
  });
});
