import { Module } from '@nestjs/common';
import { CategoriaController } from './categoria.controller';
import { CategoriaService } from './categoria.service';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [CategoriaController],
  providers: [CategoriaService, PrismaService],
  exports: [CategoriaService],
})
export class CategoriaModule {}
