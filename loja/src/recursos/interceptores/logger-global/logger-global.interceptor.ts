import {
  CallHandler,
  ConsoleLogger,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { RequisicaoComUsuario } from 'src/modulos/autenticacao/interface/interface-com-usuario';
import { Request, Response } from 'express';

@Injectable()
export class LoggerGlobalInterceptor implements NestInterceptor {
  constructor(private logger: ConsoleLogger) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const contextoHttp = context.switchToHttp();
    const requisicao = contextoHttp.getRequest<
      Request | RequisicaoComUsuario
    >();

    const response = contextoHttp.getResponse<Response>();

    const { path, method } = requisicao;

    const { statusCode } = response;

    this.logger.log(`${method}: ${path}`);

    const instantePreControlador = Date.now();

    return next.handle().pipe(
      tap(() => {
        if ('usuario' in requisicao) {
          this.logger.log(
            `Rota acessada pelo usuário: { ${requisicao.usuario.sub} }`,
          );
        }

        const tempoDeExecucaoDaRota = Date.now() - instantePreControlador;
        this.logger.verbose(
          `Resposta: status ${statusCode} - ${tempoDeExecucaoDaRota}`,
        );
      }),
    );
  }
}
