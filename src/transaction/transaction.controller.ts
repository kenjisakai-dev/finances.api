import { Body, Controller, Post } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionDTO } from './transaction.dto';

@Controller('api/v1/transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post('create')
  async create(@Body() data: TransactionDTO) {
    return await this.transactionService.create(data);
  }
}
