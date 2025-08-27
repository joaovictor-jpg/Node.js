import { IBravery } from "./types";

const values: number[] = [500, 200, 100, 50, 20, 10, 5, 2, 1]

export class Atm {

    myDictionary: IBravery[] = [];

    withdrawing(quantity: number): string {
        this.myDictionary = [];
        for (const value of values) {
            if (quantity >= value) {
                const counts = Math.floor(quantity / value);
                this.myDictionary.push({value, count: counts});
                quantity %= value;
            }
        }

        const resultParts: string[] = [];

        for (const item of this.myDictionary) {
            const billOrCoin = item.value >= 5 ? 'bill' : 'coin';
            const plural = item.count > 1 ? 's': '';
            resultParts.push(`${item.count} ${billOrCoin}${plural} of ${item.value}`);
        }

        console.log(resultParts);

        return resultParts.join(' ');
    }
}