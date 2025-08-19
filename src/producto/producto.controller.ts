/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, Req } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

// TODO: protege con JwtAuthGuard cuando tengas auth lista
@Controller()
export class ProductoController {
  constructor(private service: ProductoService) {}

  // Lista por negocio: GET /negocios/:id/productos
  @Get('negocios/:id/productos')
  listByNegocio(
    @Param('id', ParseIntPipe) negocioId: number,
    @Query('q') q?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.service.listByNegocio(negocioId, q, page, limit);
  }

  // Crear: POST /negocios/:id/productos
  @Post('negocios/:id/productos')
  create(
    @Param('id', ParseIntPipe) negocioId: number,
    @Body() dto: CreateProductoDto,
    @Req() req: any,
  ) {
    const currentUserId = req.user?.id ?? 1; // mock mientras
    const isAdmin = !!req.user?.isAdmin;
    return this.service.create(negocioId, dto, currentUserId, isAdmin);
  }

  // Detalle: GET /productos/:id
  @Get('productos/:id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.service.getById(id);
  }

  // Update: PATCH /productos/:id
  @Patch('productos/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProductoDto,
    @Req() req: any,
  ) {
    const currentUserId = req.user?.id ?? 1;
    const isAdmin = !!req.user?.isAdmin;
    return this.service.update(id, dto, currentUserId, isAdmin);
  }

  // Delete: DELETE /productos/:id
  @Delete('productos/:id')
  remove(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
    const currentUserId = req.user?.id ?? 1;
    const isAdmin = !!req.user?.isAdmin;
    return this.service.remove(id, currentUserId, isAdmin);
  }
}
