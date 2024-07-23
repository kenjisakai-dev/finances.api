import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { TransactionDTO } from './transaction.dto';

@Injectable()
export class TransactionService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: TransactionDTO) {
    return await this.prismaService.transactions.create({
      data,
    });
  }
}
