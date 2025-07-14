import { describe, it } from '@jest/globals';
import AluguesLivroService from '../../services/aluguelLivroService.js';

const aluguelLivroService = new AluguesLivroService();

describe('Testando AluguelLivroService', () => {
  it('Retornando a data de devolução do livro validando a quantidade de dias alugados', async () => {
    const dataAlugado = new Date('2024-01-01');
    const numeroDediasAlugados = 5;
    const dataDevolucaoMock = new Date('2024-01-06');

    const dataDevolucao = await aluguelLivroService.calcularDataDevolucao(dataAlugado, numeroDediasAlugados);

    expect(dataDevolucao).toStrictEqual(dataDevolucaoMock);
  });
});
