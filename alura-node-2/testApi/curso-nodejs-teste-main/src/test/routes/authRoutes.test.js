import request from 'supertest';
import {
  afterEach, beforeEach, describe, it,
} from '@jest/globals';
import app from '../../app.js';

let servidor;
beforeEach(() => {
  const port = 3000;
  servidor = app.listen(port);
});

afterEach(() => {
  servidor.close();
});

describe('Testando a rota login(POST)', () => {
  it('O login deve possuir um email e senha para se authenticar', async () => {
    const loginMock = {
      email: 'joao@gmail.com',
    };

    await request(servidor)
      .post('/login')
      .send(loginMock)
      .expect(500)
      .expect('"A senha de usuario é obrigatório."');
  });
});
