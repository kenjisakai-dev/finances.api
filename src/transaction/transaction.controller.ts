import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionDTO, TransactionUpdateDTO } from './transaction.dto';

@Controller('api/v1/finance/transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post('create')
  async create(@Body() data: TransactionDTO) {
    return await this.transactionService.add(data);
  }

  @Get('findAll')
  async findAll() {
    return await this.transactionService.findAll();
  }

  @Get('findByPeriod')
  async findByPeriod(
    @Query('month') month: string,
    @Query('year') year: string,
  ) {
    return await this.transactionService.findByPeriod(month, year);
  }

  @Patch('update')
  async update(
    @Query('cod_transaction') cod_transaction: number,
    @Body() data: TransactionUpdateDTO,
  ) {
    return await this.transactionService.update(cod_transaction, data);
  }

  @Delete('delete')
  async delete(@Query('cod_transaction') cod_transaction: number) {
    return await this.transactionService.delete(cod_transaction);
  }
}
