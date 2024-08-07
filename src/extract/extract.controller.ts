import { Controller, Get, Query } from '@nestjs/common';
import { ExtractService } from './extract.service';

@Controller('api/v1/finance/extract')
export class ExtractController {
  constructor(private readonly extractService: ExtractService) {}

  @Get('ByPeriod')
  async extract(@Query('month') month: string, @Query('year') year: string) {
    return await this.extractService.extractByPeriod(month, year);
  }

  @Get('LastMonth')
  async extractLastPeriod() {
    return await this.extractService.extractLastMonth();
  }
}
