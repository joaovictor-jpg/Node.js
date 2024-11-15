import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { ProdutoModule } from './produto /produto.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgressConfigServer } from './config/postgres.config.server';
import { ConfigModule } from '@nestjs/config';

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
  ],
})
export class AppModule {}
