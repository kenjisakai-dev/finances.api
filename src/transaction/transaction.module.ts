import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { DataRepository } from '../data/data.repository';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [TransactionController],
  providers: [TransactionService, PrismaService, DataRepository],
  exports: [TransactionService],
})
export class TransactionModule {}
