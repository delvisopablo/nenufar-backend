import { Module } from '@nestjs/common';
import { ProductoController } from './producto.controller';
import { ProductoService } from './producto.service';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [ProductoController],
  providers: [ProductoService, PrismaService],
  exports: [ProductoService],
})
export class ProductoModule {}
