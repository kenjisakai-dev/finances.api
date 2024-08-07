import { Body, Controller, Post } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionDTO } from '../dto/transaction.dto';

@Controller('api/v1/finances/transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post('create')
  async create(@Body() data: TransactionDTO) {
    return await this.transactionService.add(data);
  }
}
