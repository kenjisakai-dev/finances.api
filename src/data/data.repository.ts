import { BadRequestException, Injectable } from '@nestjs/common';
import { TransactionDTO } from '../dto/transaction.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class DataRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async add(data: TransactionDTO) {
    try {
      return await this.prismaService.transactions.create({
        data,
      });
    } catch (err) {
      throw new BadRequestException(`Erro ao gravar no banco: ${err}`);
    }
  }

  async addMany(data: TransactionDTO[]) {
    try {
      return await this.prismaService.transactions.createMany({
        data,
      });
    } catch (err) {
      throw new BadRequestException(`Erro ao gravar no banco: ${err}`);
    }
  }

  async findAll() {
    try {
      return await this.prismaService.transactions.findMany();
    } catch (err) {
      throw new BadRequestException(`Erro ao gravar no banco: ${err}`);
    }
  }

  async findByPeriod(filters: { month: number; year: number }[]) {
    try {
      return await this.prismaService.transactions.findMany({
        where: {
          OR: filters,
        },
      });
    } catch (err) {
      throw new BadRequestException(`Erro ao gravar no banco: ${err}`);
    }
  }

  async existTransaction(cod_transaction: number) {
    try {
      return await this.prismaService.transactions.findFirst({
        where: {
          cod_transaction,
        },
      });
    } catch (err) {
      throw new BadRequestException(`Erro ao gravar no banco: ${err}`);
    }
  }

  async update(cod_transaction: number, data: TransactionDTO) {
    try {
      return await this.prismaService.transactions.update({
        where: {
          cod_transaction,
        },
        data,
      });
    } catch (err) {
      throw new BadRequestException(`Erro ao gravar no banco: ${err}`);
    }
  }

  async delete(cod_transaction: number) {
    try {
      return await this.prismaService.transactions.delete({
        where: {
          cod_transaction,
        },
      });
    } catch (err) {
      throw new BadRequestException(`Erro ao gravar no banco: ${err}`);
    }
  }

  async deleteMany(filters: { month: number; year: number }[]) {
    try {
      return await this.prismaService.transactions.deleteMany({
        where: {
          OR: filters,
        },
      });
    } catch (err) {
      throw new BadRequestException(`Erro ao gravar no banco: ${err}`);
    }
  }
}
