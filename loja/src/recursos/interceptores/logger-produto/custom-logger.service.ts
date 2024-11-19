import { ConsoleLogger, Injectable } from '@nestjs/common';
import { bgMagenta, white } from 'colors';
import { appendFileSync } from 'fs';

@Injectable()
export class CustomLogger extends ConsoleLogger {
  formataLog(nome, quantidadeDisponivel, valor) {
    return `LOCAL: ${this.context} - NOME: ${nome} - QUANTIDADE: ${29} - PREÇO: ${valor} - TIMESTAMP ${this.getTimestamp()}`;
  }

  logColorido(produto) {
    const { nome, quantidadeDisponivel, valor } = produto;
    const logFormatado = this.formataLog(nome, quantidadeDisponivel, valor);

    console.log(bgMagenta(white(logFormatado)));
  }

  logEmArquivo(produto) {
    const { nome, quantidadeDisponivel, valor } = produto;

    const mensagemFormatada =
      this.formataLog(nome, quantidadeDisponivel, valor) + '\n'; //adicionei a quebra de linha pois o appendFileSync não faz isso automaticamente

    const caminhoDoLog = './src/modulos/customLogger/arquivo.log';
    appendFileSync(caminhoDoLog, mensagemFormatada);
  }
}
