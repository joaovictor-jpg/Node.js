import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionModule } from './transaction/transaction.module';
import DataBaseConfig from './config/database.config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DecimalFormatInterceptor } from './transaction/Interceptors/decimal-format-interceptor';
import { StringFormatInterceptor } from './transaction/Interceptors/string-format-interceptor';

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
    {
      provide: APP_INTERCEPTOR,
      useClass: StringFormatInterceptor,
    },
  ],
})
export class AppModule {}
