import { Atm } from "../src/Atm";

describe('ATM', () => {
    it('Should return one bill of 200 when withdrawing 200', () => {
        const atm = new Atm();
        const expected = '1 bill of 200';

        const result = atm.withdrawing(200);

        expect(result).toEqual(expected);
    })

    it('should return two bills of 200 when withdrawing 400', () => {
        const atm = new Atm();
        const expected = '2 bills of 200';

        const result = atm.withdrawing(400);

        expect(result).toEqual(expected);
    })

    it('should return one bill of 500 when withdrawing 500', () => {
        const atm = new Atm();
        const expected = '1 bill of 500';

        const result = atm.withdrawing(500);

        expect(result).toEqual(expected);
    })

    it('should return two bills of 200, one bill of 20, one bill of 10 and 2 coins of 2 when withdrawing 434', () => {
        const atm = new Atm();
        const expected = '2 bills of 200 ' + '1 bill of 20 ' + '1 bill of 10 ' + '2 coins of 2';

        const result = atm.withdrawing(434);

        expect(result).toEqual(expected);
    })

    it('should return one bill of 200, one bill of 20 when withdrawing 220', () => {
        const atm = new Atm();
        const expected = '1 bill of 200 ' + '1 bill of 20';

        const result = atm.withdrawing(220);

        expect(result).toEqual(expected);
    })

    it('should return one coin of 1 when withdrawing 1', () => {
        const atm = new Atm();
        const expected = '1 coin of 1';

        const result = atm.withdrawing(1);

        expect(result).toEqual(expected);
    })

    it('should return empty string when withdrawing 0', () => {
        const atm = new Atm();
        const expected = '';

        const result = atm.withdrawing(0);

        expect(result).toEqual(expected);
    })

    it('should return two bills of 500 when withdrawing 1000', () => {
        const atm = new Atm();
        const expected = '2 bills of 500';

        const result = atm.withdrawing(1000);

        expect(result).toEqual(expected);
    })
})

describe('ATM Maquina: ERRORS', () => {
    it ('When the ATM machine has no more money should return an error that shows', () => {
        const atm = new Atm();
        const expected = 'The ATM machine has not enough money, please go to the nearest atm machine';

        expect(() => atm.withdrawing(10000000000000000000)).toThrow(expected);
    })
})