import { Injectable } from '@nestjs/common';
import { RpaService } from '../rpa/rpa.service';
import { TransactionDTO } from '../dto/transaction.dto';
import { PrismaService } from '../../prisma/prisma.service';
import * as xlsx from 'xlsx';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ExtractService {
  constructor(
    private readonly rpaService: RpaService,
    private readonly prismaService: PrismaService,
  ) {}

  async extractByPeriod(month: string, year: string) {
    const path = await this.rpaService.extractFile();
    const data = await this.getData(path);
    const save = await this.load(data, month, year);

    return { load: save.count };
  }

  async extractLastMonth() {
    const date = new Date();
    const month = date.getMonth().toString();
    const year = date.getFullYear().toString();

    const path = await this.rpaService.extractFile();
    const data = await this.getData(path);
    const save = await this.load(data, month, year);

    return { load: save.count };
  }

  async getData(path: string): Promise<TransactionDTO[]> {
    const workbook = xlsx.readFile(path);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const values = xlsx.utils.sheet_to_json(worksheet);
    const data = plainToClass(TransactionDTO, values);
    return data;
  }

  async load(data: TransactionDTO[], month: string, year: string) {
    const monthList = month.split(',').map((x) => parseInt(x));
    const yearList = year.split(',').map((x) => parseInt(x));
    const filters = [];

    for (let year of yearList) {
      for (let month of monthList) {
        filters.push({ year, month });
      }
    }

    await this.prismaService.transactions.deleteMany({
      where: {
        OR: filters,
      },
    });

    const dataPeriod = data.filter(
      (x) => monthList.includes(x.month) && yearList.includes(x.year),
    );

    return await this.prismaService.transactions.createMany({
      data: dataPeriod,
    });
  }
}
