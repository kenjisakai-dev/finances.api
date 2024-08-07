import { BadRequestException, Injectable } from '@nestjs/common';
import { DataRepository } from '../data/data.repository';
import { TransactionDTO } from '../dto/transaction.dto';

@Injectable()
export class TransactionService {
  constructor(private readonly dataRepository: DataRepository) {}

  async add(data: TransactionDTO) {
    return await this.dataRepository.add(data);
  }

  async findAll() {
    return await this.dataRepository.findAll();
  }

  async findByPeriod(month: string, year: string) {
    const monthList = month.split(',').map((x) => parseInt(x));
    const yearList = year.split(',').map((x) => parseInt(x));
    const filters = [];

    for (let year of yearList) {
      for (let month of monthList) {
        filters.push({ year, month });
      }
    }

    return await this.dataRepository.findByPeriod(filters);
  }

  async update(cod_transaction: number, data: TransactionDTO) {
    const transaction =
      await this.dataRepository.existTransaction(cod_transaction);

    if (!transaction) throw new BadRequestException('Transação não encontrada');

    return await this.dataRepository.update(cod_transaction, data);
  }

  async delete(cod_transaction: number) {
    const transaction =
      await this.dataRepository.existTransaction(cod_transaction);

    if (!transaction) throw new BadRequestException('Transação não encontrada');

    return await this.dataRepository.delete(cod_transaction);
  }
}
