import { Module } from '@nestjs/common';
import { PetalosController } from './petalos.controller';
import { PetalosService } from './petalos.service';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [PetalosController],
  providers: [PetalosService, PrismaService],
  exports: [PetalosService],
})
export class PetalosModule {}
