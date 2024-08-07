import { Module } from '@nestjs/common';
import { RpaService } from '../rpa/rpa.service';
import { ExtractService } from './extract.service';
import { ExtractController } from './extract.controller';
import { DataRepository } from '../data/data.repository';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [ExtractController],
  providers: [ExtractService, RpaService, PrismaService, DataRepository],
  exports: [ExtractService],
})
export class ExtractModule {}
