import { describe, expect, it } from '@jest/globals';
import AuthService from '../../services/authService.js';

const authService = new AuthService();

describe('Testando a authservice.cadastrarUsuario', () => {
  it('O usuário deve possuir um nome, email e senha', async () => {
    const usuarioMock = {
      nome: 'Raphael',
      email: 'raphael@gmail.com',
    };

    const usuarioSalvo = authService.cadastrarUsuario(usuarioMock);

    await expect(usuarioSalvo).rejects.toThrowError('A senha de usuário é obrigatória!');
  });
});
