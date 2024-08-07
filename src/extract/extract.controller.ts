import { Controller, Get, Query } from '@nestjs/common';
import { ExtractService } from './extract.service';

@Controller('api/v1/finances')
export class ExtractController {
  constructor(private readonly extractService: ExtractService) {}

  @Get('extractByPeriod')
  async extract(@Query('month') month: string, @Query('year') year: string) {
    return await this.extractService.extractByPeriod(month, year);
  }

  @Get('extractLastMonth')
  async extractLastPeriod() {
    return await this.extractService.extractLastMonth();
  }
}
