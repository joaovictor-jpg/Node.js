import {
  describe, expect, it, jest,
} from '@jest/globals';
import Editora from '../../models/editora.js';

describe('Testando o modelo editora', () => {
  const objetoEditora = {
    nome: 'CDC',
    cidade: 'São Paulo',
    email: 'c@c.com',
  };

  it('Deve instanciar uma nova editora', () => {
    const editora = new Editora(objetoEditora);

    expect(editora).toEqual(expect.objectContaining(objetoEditora));
  });

  it.skip('Deve salva editora no bd', async () => {
    const editora = new Editora(objetoEditora);
    const editoraSalva = await editora.salvar();
    expect(editoraSalva).toEqual(expect.objectContaining(objetoEditora));
    expect(editora.nome).toStrictEqual(objetoEditora.nome);
  });

  it.skip('Deve Retorna pelo id', async () => {
    const editora = new Editora(objetoEditora);

    const editoraSalva = await editora.salvar();
    const editoraBuscadoPorId = await Editora.pegarPeloId(editoraSalva.id);

    expect(editoraBuscadoPorId).toEqual(expect.objectContaining(editoraSalva));
    expect(editoraBuscadoPorId.nome).toStrictEqual(objetoEditora.nome);
    expect(editoraBuscadoPorId).toEqual(expect.objectContaining({
      id: expect.any(Number),
      ...objetoEditora,
      created_at: expect.any(String),
      updated_at: expect.any(String),
    }));
  });

  it('Deve fazer uma chamada simulada ao banco de dados', async () => {
    const editora = new Editora(objetoEditora);

    editora.salvar = jest.fn().mockReturnValue({
      id: 10,
      nome: 'CDC',
      cidade: 'São Paulo',
      email: 'c@c.com',
      created_at: '2025-07-14',
      updated_at: '2025-07-14',
    });

    const retorna = editora.salvar();

    expect(retorna).toEqual(expect.objectContaining({
      id: expect.any(Number),
      ...objetoEditora,
      created_at: expect.any(String),
      updated_at: expect.any(String),
    }));
  });
});
