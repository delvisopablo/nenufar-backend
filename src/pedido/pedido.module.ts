import { Module } from '@nestjs/common';
import { PedidoController } from './pedido.controller';
import { PedidoService } from './pedido.service';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [PedidoController],
  providers: [PedidoService, PrismaService],
  exports: [PedidoService],
})
export class PedidoModule {}
