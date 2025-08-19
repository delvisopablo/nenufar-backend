import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { AddItemDto } from './dto/add-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { CreateCompraDto } from './dto/create-compra.dto';
import { CreatePagoDto } from './dto/create-pago.dto';

@Controller()
export class PedidoController {
  constructor(private service: PedidoService) {}

  // ---- Pedidos ----
  @Post('negocios/:negocioId/pedidos')
  createPedido(@Param('negocioId', ParseIntPipe) negocioId: number) {
    return this.service.createPedido(negocioId);
  }

  @Get('pedidos/:id')
  getPedido(@Param('id', ParseIntPipe) id: number) {
    return this.service.getPedido(id);
  }

  @Patch('pedidos/:id')
  updatePedido(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePedidoDto,
  ) {
    return this.service.updatePedido(id, dto);
  }

  // líneas
  @Post('pedidos/:id/items')
  addItem(
    @Param('id', ParseIntPipe) pedidoId: number,
    @Body() dto: AddItemDto,
  ) {
    return this.service.addItem(pedidoId, dto);
  }

  @Patch('pedidos/:id/items/:productoId')
  updateItem(
    @Param('id', ParseIntPipe) pedidoId: number,
    @Param('productoId', ParseIntPipe) productoId: number,
    @Body() dto: UpdateItemDto,
  ) {
    return this.service.updateItemCantidad(pedidoId, productoId, dto);
  }

  @Delete('pedidos/:id/items/:productoId')
  removeItem(
    @Param('id', ParseIntPipe) pedidoId: number,
    @Param('productoId', ParseIntPipe) productoId: number,
  ) {
    return this.service.removeItem(pedidoId, productoId);
  }

  // ---- Compras ----
  @Post('pedidos/:id/compras')
  createCompra(
    @Param('id', ParseIntPipe) pedidoId: number,
    @Body() _dto: CreateCompraDto,
    @Req() req: { user?: { id?: number } },
  ) {
    const userId = req.user?.id ?? 1; // TODO: JwtAuthGuard
    return this.service.createCompra(pedidoId, userId, _dto);
  }

  @Get('compras/:id')
  getCompra(@Param('id', ParseIntPipe) id: number) {
    return this.service.getCompra(id);
  }

  @Get('me/compras')
  misCompras(
    @Req() req: { user?: { id?: number } },
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    const userId = req.user?.id ?? 1;
    return this.service.listComprasUsuario(userId, page, limit);
  }

  // ---- Pagos ----
  @Post('compras/:id/pagos')
  createPago(
    @Param('id', ParseIntPipe) compraId: number,
    @Body() dto: CreatePagoDto,
  ) {
    return this.service.createPago(compraId, dto);
  }

  @Get('pagos/:id')
  getPago(@Param('id', ParseIntPipe) id: number) {
    return this.service.getPago(id);
  }

  @Get('me/pagos')
  misPagos(
    @Req() req: { user?: { id?: number } },
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    const userId = req.user?.id ?? 1;
    return this.service.listPagosUsuario(userId, page, limit);
  }
}
