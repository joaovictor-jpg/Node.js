import Item from '../src/item.js';

describe('Teste dos itens', () => {
    const item = new Item('Beterraba', 2.5, 10);
    it('Deve ter 3 campos nome, valor e quantidade', () => {
        expect(item.nome).toBe('Beterraba');
        expect(item.valor).toBe(2.5);
        expect(item.quantidade).toBe(10);
    });

    it('Deve ter o preço calculado de acordo com a quantidade.', () => {
        expect(item.pegaValorTotalItem()).toBe(25);
    });
});
