import { describe, expect } from '@jest/globals';
import bcryptjs from 'bcryptjs';
import AuthServices from '../../services/authService.js';
import Usuario from '../../models/usuario.js';

const authService = new AuthServices();

describe('Testando a authServices.cadastrarUsuario', () => {
  it('O usuario deve possuir um nome, email e senha', async () => {
    const usuarioMock = {
      nome: 'Raphael',
      email: 'raphael@teste.com',
    };

    const resultado = authService.cadastrarUsuario(usuarioMock);

    await expect(resultado).rejects.toThrowError('A senha de usuário é obrigatória!');
  });

  it('A senha do usuário precisa ser criptografada quando for salva no banco de dados', async () => {
    const data = {
      nome: 'John Doe',
      email: 'johndoe@example.com',
      senha: 'senha123',
    };

    const resultado = await authService.cadastrarUsuario(data);
    const senhaIguais = await bcryptjs.compare('senha123', resultado.content.senha);

    expect(senhaIguais).toStrictEqual(true);

    await Usuario.excluir(resultado.content.id);
  });

  it('Não pode ser cadastrado um usuário com e-mail duplicado', async () => {
    const usuarioMock = {
      nome: 'Raphael',
      email: 'raphael@teste.com',
      senha: 'teste',
    };

    const resultado = authService.cadastrarUsuario(usuarioMock);

    await expect(resultado).rejects.toThrowError('Email já existente!');
  });

  it('Ao cadastrar um usuário deve ser retornada uma mensagem informando que o cadastro foi realizado', async () => {
    const usuarioMock = {
      nome: 'João Victor',
      email: 'johndoe@example.com',
      senha: 'teste',
    };

    const resultado = await authService.cadastrarUsuario(usuarioMock);

    expect(resultado.message).toEqual('usuario criado');

    await Usuario.excluir(resultado.content.id);
  });

  it('Ao cadastrar um usuário, validar o retorno das informações do usuário', async () => {
    const data = {
      nome: 'John Doe',
      email: 'johndoe@example.com',
      senha: 'senha123',
    };

    const resultado = await authService.cadastrarUsuario(data);

    expect(resultado.content).toMatchObject(data);

    await Usuario.excluir(resultado.content.id);
  });
});
