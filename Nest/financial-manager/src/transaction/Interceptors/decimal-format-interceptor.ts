import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class DecimalFormatInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      map((data: unknown) => {
        if (Array.isArray(data)) {
          return data.map((item) => this.transformObject(item));
        }
        return this.transformObject(data);
      }),
    );
  }

  private transformObject(obj: unknown): unknown {
    if (this.isObjectWithValue(obj)) {
      return {
        ...obj,
        value: this.formatIntToCurrencyString(obj.value),
      };
    }

    return obj;
  }

  private formatIntToCurrencyString(value: number): string {
    if (typeof value !== 'number') {
      return value;
    }

    const cents = value % 100;
    const real = Math.floor(value / 100);
    return `${real},${cents.toString().padStart(2, '0')}`;
  }

  private isObjectWithValue(obj: unknown): obj is { value: number } {
    return typeof obj === 'object' && obj !== null && 'value' in obj;
  }
}
