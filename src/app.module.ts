import { Module } from '@nestjs/common';
import { TransactionModule } from './transaction/transaction.module';
import { ExtractModule } from './extract/extract.module';

@Module({
  imports: [TransactionModule, ExtractModule],
})
export class AppModule {}
