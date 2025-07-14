import { somaHorasExtras, calculaDescontos } from "..";

describe('Teste dos cálculos de folha.', () => {
    it('Deve retorna a soma das horas extras', () => {
        const esperado = 2500;
        const retorna = somaHorasExtras(2000, 500);

        expect(retorna).toBe(esperado);
    });


    it('Deve descontar o valor do salário', () => {
        const esperado = 2300;
        const resultado = calculaDescontos(2500, 200);

        expect(resultado).toBe(esperado);
    });
});
