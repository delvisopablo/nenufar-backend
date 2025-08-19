import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { LogroController } from './logro.controller';
import { LogroService } from './logro.service';

@Module({
  controllers: [LogroController],
  providers: [LogroService, PrismaService],
  exports: [LogroService],
})
export class LogroModule {}
