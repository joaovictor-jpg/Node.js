import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import DataBaseConfig from './config/database.config';
import { DecimalFormatInterceptor } from './transaction/Interceptors/decimal-format-interceptor';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: DataBaseConfig,
    }),
    TransactionModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: DecimalFormatInterceptor,
    },
  ],
})
export class AppModule {}
