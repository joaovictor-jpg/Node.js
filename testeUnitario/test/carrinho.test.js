import Carrinho from "../carrinho/carrinho.js";
import Item from "../carrinho/item.js";

describe("Teste do carrinho", () => {
  it("Deve inicializar vazio", () => {
    const carrinho = new Carrinho();

    expect(carrinho.subtotal).toBeNull();
  });

  it("Deve ter itens", () => {
    const item = new Item("Banana", 2, 5);
    const item2 = new Item("Maça", 0.5, 1);
    const item3 = new Item("Morango", 2.5, 5);

    const carrinho = new Carrinho();
    carrinho.adiciona(item);
    carrinho.adiciona(item2);

    expect(typeof carrinho).toBe("object");
    expect(carrinho.itens[0]).toBe(item);
    expect(carrinho.itens[1]).toBe(item2);

    expect(carrinho.itens).toContain(item);
    expect(carrinho.itens).toContain(item2);
  });

  it("Deve ter a propriedade 'total' na inicialização", () => {
    const carrinho = new Carrinho();

    expect(carrinho).toHaveProperty("total");
  });

  it("Deve lançar erro ao finalizar compra com carrinho vazio", () => {
    function englobaErroCarrinho() {
      const carrinho = new Carrinho();
      carrinho.finalizaCompra();
    }

    expect(englobaErroCarrinho).toThrowError("Carrinho de compras vazio");
  });

  it("Deve adicionar o frete", () => {
    const carrinho = new Carrinho();
    carrinho.adicionaFrete(10);
    expect(carrinho.frete).toBe(10);
  });

  it("Deve finalizar as compras", () => {
    const item = new Item("Banana", 2, 5);
    const item2 = new Item("Mel", 1, 5);

    const carrinho = new Carrinho();
    carrinho.adiciona(item);
    carrinho.adiciona(item2);
    carrinho.adicionaFrete(5);

    expect(carrinho.calculaTotal()).toBe(20);
    expect(carrinho.finalizaCompra()).toStrictEqual({
      subtotal: 15,
      frete: 5,
      total: 20
    });
  });
});