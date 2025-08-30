import { IBravery, IValues } from "./types";

export class Atm {

    myDictionary: IBravery[] = [];
    values: IValues[] = [
        {
            value: 500,
            quantity: 2
        },
        {
            value: 200,
            quantity: 3
        },
        {
            value: 100,
            quantity: 5,
        },
        {
            value: 50,
            quantity: 12
        },
        {
            value: 20,
            quantity: 20,
        },
        {
            value: 10,
            quantity: 50
        },
        {
            value: 5,
            quantity: 100
        },
        {
            value: 2,
            quantity: 250
        },
        {
            value: 1,
            quantity: 500
        }
    ]

    withdrawing(withdraw: number): string {

        this.myDictionary = [];

        for (const v of this.values) {
            if (withdraw >= v.value && v.quantity > 0) {
                const counts = Math.floor(withdraw / v.value);
                let quantityR = 0;
                if (counts >= v.quantity) {
                    quantityR = v.quantity;
                    v.quantity = 0
                } else {
                    quantityR = counts;
                    v.quantity = v.quantity - counts;
                }
                this.myDictionary.push({ value: v.value, count: quantityR });
                withdraw = withdraw - (v.value * quantityR)
            }

            if (withdraw <= 0) {
                break
            }
        }



        const resultParts: string[] = [];

        for (const item of this.myDictionary) {
            const billOrCoin = item.value >= 5 ? 'bill' : 'coin';
            const plural = item.count > 1 ? 's' : '';
            resultParts.push(`${item.count} ${billOrCoin}${plural} of ${item.value}`);
        }

        if (withdraw > 0) {
            throw new Error("The ATM machine has not enough money, please go to the nearest atm machine");
        }

        return resultParts.join(' ');
    }
}