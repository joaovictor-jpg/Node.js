import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { ProdutoModule } from './produto/produto.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgressConfigServer } from './config/postgres.config.server';
import { ConfigModule } from '@nestjs/config';
import { PedidoModule } from './pedido/pedido.module';
import { APP_FILTER } from '@nestjs/core';
import { FiltroDeExcecaoHttp } from './filtros/filtro-de-excecao-http';

@Module({
  imports: [
    UsuarioModule,
    ProdutoModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgressConfigServer,
      inject: [PostgressConfigServer],
    }),
    PedidoModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: FiltroDeExcecaoHttp,
    },
  ],
})
export class AppModule {}
