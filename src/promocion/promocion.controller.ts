import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  Request,
  ParseIntPipe,
} from '@nestjs/common';
import { PromocionService } from './promocion.service';
import { CreatePromocionDto } from './dto/create-promocion.dto';
import { UpdatePromocionDto } from './dto/update-promocion.dto';
import { PrismaService } from '../../prisma/prisma.service';
// import { AuthGuard } from '../auth/auth.guard';

// @UseGuards(AuthGuard)
@Controller('promociones')
export class PromocionController {
  constructor(
    private promocionService: PromocionService,
    private prisma: PrismaService,
  ) {}

  @Post()
  crear(@Body() dto: CreatePromocionDto, @Request() req) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    return this.promocionService.crearPromocion(dto, req.usuario.id);
  }

  @Get()
  getPromos() {
    return this.promocionService.getPromos();
  }
  // @Get('promociones/activas')
  // findActivas() {
  //   return this.prisma.promocion.findMany({
  //     where: {
  //       fechaCaducidad: {
  //         gte: new Date(),
  //       },
  //     },
  //   });
  // }

  @Get('activas')
  async findActivas() {
    return this.prisma.promocion.findMany({
      where: {
        fechaCaducidad: {
          gte: new Date(),
        },
      },
      include: {
        negocio: {
          select: {
            id: true,
            nombre: true,
            categoria: true,
          },
        },
        producto: true,
        pack: true,
      },
    });
  }

  // 🔹 Obtener todas las promociones de un negocio concreto
  @Get('negocio/:id')
  async findByNegocio(@Param('id') id: string) {
    return this.prisma.promocion.findMany({
      where: {
        negocioId: parseInt(id),
      },
      include: {
        producto: true,
        pack: true,
      },
    });
  }
  // @Get('negocio/:id')
  // listarPorNegocio(@Param('id', ParseIntPipe) id: number) {
  //   return this.promocionService.listarPorNegocio(id);
  // }

  @Patch(':id')
  actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePromocionDto,
    @Request() req,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    return this.promocionService.actualizarPromocion(id, dto, req.usuario.id);
  }

  @Delete(':id')
  borrar(@Param('id', ParseIntPipe) id: number, @Request() req) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    return this.promocionService.borrarPromocion(id, req.usuario.id);
  }
}
