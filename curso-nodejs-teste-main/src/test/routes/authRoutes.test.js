import request from 'supertest';
import {
  afterEach, beforeEach, describe, expect,
} from '@jest/globals';
import app from '../../app.js';

let servidor;

beforeEach(() => {
  const port = 300;
  servidor = app.listen(port);
});

afterEach(() => {
  servidor.close();
});

describe('Testando a rota login (POST)', () => {
  it('O login deve possuir um email e senha para se autenticar', async () => {
    const loginMock = {
      email: 'raphael@teste.com.br',
    };

    await request(servidor)
      .post('/login')
      .send(loginMock)
      .expect(500)
      .expect('"A senha de usuario é obrigatório."');
  });

  it('O login deve validar se o usuário está cadastrado', async () => {
    const loginMock = {
      email: 'joaovictor@mdasilca.com',
      senha: 'teste123',
    };

    await request(servidor)
      .post('/login')
      .send(loginMock)
      .expect(500)
      .expect('"Usuario não cadastrado."');
  });

  it('O login deve validar e-mail e senha incorreto', async () => {
    const loginMock = {
      email: 'raphael@teste.com.br',
      senha: 'teste',
    };

    await request(servidor)
      .post('/login')
      .send(loginMock)
      .expect(500)
      .expect('"Usuario ou senha invalido."');
  });

  it('O login deve validar se está sendo retornado um accessToken', async () => {
    const loginMock = {
      email: 'raphael@teste.com.br',
      senha: '123456',
    };
    const resposta = await request(app)
      .post('/login')
      .set('Accept', 'application/json')
      .send(loginMock)
      .expect(201);
    expect(resposta.body.message).toBe('Usuario conectado');
    expect(resposta.body).toHaveProperty('accessToken');
  });
});
