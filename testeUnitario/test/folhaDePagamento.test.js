import { somaHorasExtras, calculaDescontos } from "../index.js";

describe("Teste dos cáculos de folha", () => {
  it("Deve retorna a soma das horas extras", () => {
    const esperado = 2500;
    const retorna = somaHorasExtras(2000, 500);
    
    expect(retorna).toBe(esperado);
  });
    
  it("Deve retorna o desconto do valor do salario", () => {
    const esperado = 2300;
    const retorno = calculaDescontos(2500, 200);
    expect(retorno).toBe(esperado);
  });
});
