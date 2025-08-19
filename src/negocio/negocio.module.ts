import { Module } from '@nestjs/common';
import { NegocioController } from './negocio.controller';
import { NegocioService } from './negocio.service';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [NegocioController],
  providers: [NegocioService, PrismaService],
  exports: [NegocioService],
})
export class NegocioModule {}
