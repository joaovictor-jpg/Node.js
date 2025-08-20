/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { Filters } from '../types/filters';

@Injectable()
export class ParseCurrencyPipe implements PipeTransform<Filters, Filters> {
  private readonly currencyKeys = [
    'value',
    'minimum_value',
    'maximum_value',
    'result',
    'totalEntradas',
    'totalGastos',
  ];

  transform(value: Filters, metadata: ArgumentMetadata): Filters {
    if (!value || typeof value !== 'object') {
      return value;
    }

    for (const key of this.currencyKeys) {
      const currencyValue = value[key];
      if (typeof currencyValue === 'string') {
        value[key] = this.parseBRLCurrencyToCents(currencyValue);
      }
    }
    return value;
  }

  private parseBRLCurrencyToCents(value: string): number {
    const withoutDots = value.replace(/\./g, '');
    const asFloatString = withoutDots.replace(',', '.');
    const floatValue = parseFloat(asFloatString);
    return Math.round(floatValue * 100);
  }
}
