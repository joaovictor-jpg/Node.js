import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CreateTransactionDto } from '../dto/create-transaction.dto';

export class StringFormatInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<Request>();
    const body = request.body;
    if (this.bodyHasValue(body) && typeof body.value === 'string') {
      body.value = this.parseBRLCurrencyToCents(body.value);
    }
    return next.handle();
  }

  private parseBRLCurrencyToCents(value: string): number {
    const withoutDots = value.replace(/\./g, '');
    const asFloatString = withoutDots.replace(',', '.');

    const floatValue = parseFloat(asFloatString);

    return Math.round(floatValue * 100);
  }

  private bodyHasValue(body: unknown): body is CreateTransactionDto {
    return typeof body === 'object' && body !== null && 'value' in body;
  }
}
