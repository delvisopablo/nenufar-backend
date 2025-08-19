/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { ResenaService } from './resena.service';
import { CreateResenaDto } from './dto/create-resena.dto';
import { UpdateResenaDto } from './dto/update-resena.dto';

@Controller('resena')
export class ResenaController {
  constructor(private readonly resenaService: ResenaService) {}

  /** Todas las reseñas (global) */
  @Get()
  todas() {
    return this.resenaService.todasLasResenas();
  }

  /** Reseñas de un negocio */
  @Get('negocio/:id')
  porNegocio(@Param('id', ParseIntPipe) id: number) {
    return this.resenaService.getResenasPorNegocio(id);
  }

  /** Reseñas de un usuario */
  @Get('usuario/:id')
  porUsuario(@Param('id', ParseIntPipe) id: number) {
    return this.resenaService.findByUsuarioId(id);
  }

  /** Últimas reseñas (top 10) */
  @Get('ultimas')
  ultimas() {
    return this.resenaService.obtenerUltimas();
  }

  /** Media de puntuación para un negocio */
  @Get('media/:negocioId')
  media(@Param('negocioId', ParseIntPipe) negocioId: number) {
    return this.resenaService.calcularMediaPorNegocio(negocioId);
  }

  /** Crear reseña (+ post + pétalos) */
  @Post()
  crear(@Body() dto: CreateResenaDto, @Req() req: any) {
    const userId: number = typeof req.user?.id === 'number' ? req.user.id : 1; // TODO: reemplazar por JwtAuthGuard
    return this.resenaService.crear(userId, dto);
  }

  /** Actualizar reseña (solo autor) */
  @Patch(':id')
  actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateResenaDto,
    @Req() req: any,
  ) {
    const userId: number = typeof req.user?.id === 'number' ? req.user.id : 1;
    return this.resenaService.actualizar(id, dto, userId);
  }

  /** Eliminar reseña (solo autor) */
  @Delete(':id')
  eliminar(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
    const userId: number = typeof req.user?.id === 'number' ? req.user.id : 1;
    return this.resenaService.eliminar(id, userId);
  }
}
