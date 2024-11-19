import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CriaProdutoDTO } from './dto/cria-produto.dto';
import { AtualizaProdutoDTO } from './dto/atualiza-produto-dto';
import { ProdutoService } from './produto.service';
import { ListaProdutoDTO } from './dto/lista-produto.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { AutenticacaoGuard } from '../autenticacao/autenticacao/autenticacao.guard';
import { RequisicaoComUsuario } from '../autenticacao/interface/interface-com-usuario';

@Controller('/produtos')
export class ProdutoController {
  constructor(
    private readonly produtoService: ProdutoService,
    @Inject(CACHE_MANAGER) private gerenciadorDeCache: Cache,
  ) {}

  @Get()
  @UseInterceptors(CacheInterceptor)
  public async lista(): Promise<ReadonlyArray<ListaProdutoDTO>> {
    return this.produtoService.listaProdutos();
  }

  @Get(':id')
  public async listartPorId(@Param('id') id: string): Promise<any> {
    let produto = await this.gerenciadorDeCache.get<ListaProdutoDTO>(
      `produto-${id}`,
    );

    if (!produto) {
      produto = await this.produtoService.buscarPorId(id);

      await this.gerenciadorDeCache.set(`produto-${id}`, produto);
    }

    return {
      mensagem: 'Produto obtido com sucesso.',
      produto,
    };
  }

  @Post()
  @UseGuards(AutenticacaoGuard)
  public async cadastrarProduto(
    @Req() req: RequisicaoComUsuario,
    @Body() produto: CriaProdutoDTO,
  ): Promise<ListaProdutoDTO> {
    produto.usuarioId = req.usuario.sub;

    const produtoDTO = await this.produtoService.criaProduto(produto);
    return produtoDTO;
  }

  @Put('/:id')
  @UseGuards(AutenticacaoGuard)
  public async atualizarProduto(
    @Param('id') id: string,
    @Body() dadosAtualizados: AtualizaProdutoDTO,
  ): Promise<string> {
    await this.produtoService.atualizaProduito(id, dadosAtualizados);
    return `Produto com id: ${id}, foi atualizado com sucesso`;
  }

  @Delete('/:id')
  @UseGuards(AutenticacaoGuard)
  public async deletaProduto(@Param('id') id: string): Promise<any> {
    await this.produtoService.deletaUProduto(id);
    return {
      messagem: `Produto com id: ${id}, foi deletado com sucesso`,
    };
  }
}
