import { Module } from '@nestjs/common';
import { ResenaController } from './resena.controller';
import { ResenaService } from './resena.service';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [ResenaController],
  providers: [ResenaService, PrismaService],
  exports: [ResenaService],
})
export class ResenaModule {}
