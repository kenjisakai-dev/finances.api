import { Module } from '@nestjs/common';
import { RpaService } from '../rpa/rpa.service';
import { ExtractService } from './extract.service';
import { PrismaService } from '../../prisma/prisma.service';
import { ExtractController } from './extract.controller';

@Module({
  controllers: [ExtractController],
  providers: [ExtractService, RpaService, PrismaService],
  exports: [ExtractService],
})
export class ExtractModule {}
