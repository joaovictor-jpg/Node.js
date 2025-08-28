import { IBravery, IValues } from "./types";

export class Atm {

    myDictionary: IBravery[] = [];
    values: IValues[] = [
        {
            value: 500,
            quantity: 0
        },
        {
            value: 200,
            quantity: 0
        },
        {
            value: 100,
            quantity: 0,
        },
        {
            value: 50,
            quantity: 0
        },
        {
            value: 20,
            quantity: 0,
        },
        {
            value: 10,
            quantity: 0
        },
        {
            value: 5,
            quantity: 0
        },
        {
            value: 2,
            quantity: 0
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
                let money = v.value;
                const counts = Math.floor(withdraw / money);
                let quantityR = 0;
                if (counts > v.quantity) {
                    quantityR = v.quantity;
                    v.quantity = 0
                    money = money * quantityR;
                } else {
                    quantityR = counts;
                    v.quantity = v.quantity - counts;
                }
                this.myDictionary.push({value: v.value, count: quantityR});
                withdraw = withdraw - (v.value * quantityR)
            }
        }

        const resultParts: string[] = [];

        for (const item of this.myDictionary) {
            const billOrCoin = item.value >= 5 ? 'bill' : 'coin';
            const plural = item.count > 1 ? 's': '';
            resultParts.push(`${item.count} ${billOrCoin}${plural} of ${item.value}`);
        }

        if (withdraw > 0) {
            throw new Error("The ATM machine has not enough money, please go to the nearest atm machine");            
        }

        return resultParts.join(' ');
    }
}