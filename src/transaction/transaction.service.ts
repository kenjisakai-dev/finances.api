import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { TransactionDTO } from '../dto/transaction.dto';

@Injectable()
export class TransactionService {
  constructor(private readonly prismaService: PrismaService) {}

  async add(data: TransactionDTO) {
    return await this.prismaService.transactions.create({
      data,
    });
  }
}
