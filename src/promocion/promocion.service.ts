import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePromocionDto } from './dto/create-promocion.dto';
import { UpdatePromocionDto } from './dto/update-promocion.dto';

@Injectable()
export class PromocionService {
  constructor(private prisma: PrismaService) {}

  async crearPromocion(dto: CreatePromocionDto, usuarioId: number) {
    const negocio = await this.prisma.negocio.findUnique({
      where: { id: dto.negocioId },
    });

    if (!negocio) throw new NotFoundException('Negocio no encontrado');
    if (negocio.duenoId !== usuarioId)
      throw new ForbiddenException(
        'No puedes crear promociones para este negocio',
      );

    return this.prisma.promocion.create({
      data: {
        titulo: dto.titulo,
        descripcion: dto.descripcion,
        fechaCaducidad: new Date(dto.fechaCaducidad),
        descuento: dto.descuento,
        productoId: dto.productoId,
        negocioId: dto.negocioId,
        pack: {
          connect: dto.packIds?.map((id) => ({ id })) || [],
        },
      },
    });
  }

  async actualizarPromocion(
    id: number,
    dto: UpdatePromocionDto,
    usuarioId: number,
  ) {
    const promo = await this.prisma.promocion.findUnique({
      where: { id },
      include: { negocio: true },
    });

    if (!promo) throw new NotFoundException('Promoción no encontrada');
    if (promo.negocio.duenoId !== usuarioId)
      throw new ForbiddenException('No puedes editar esta promoción');

    return this.prisma.promocion.update({
      where: { id },
      data: {
        ...dto,
        fechaCaducidad: dto.fechaCaducidad
          ? new Date(dto.fechaCaducidad)
          : undefined,
        productoId: dto.productoId,
        pack: dto.packIds
          ? {
              set: dto.packIds.map((id) => ({ id })),
            }
          : undefined,
      },
    });
  }

  getPromos() {
    return [
      { id: 1, titulo: '2x1 en Cañas', negocio: 'Bar Pepe' },
      { id: 2, titulo: 'Descuento del 10%', negocio: 'Tienda María' },
      { id: 3, titulo: 'Promo Especial Sábado', negocio: 'Café Sol' },
    ];
  }

  async listarPorNegocio(negocioId: number) {
    return this.prisma.promocion.findMany({
      where: { negocioId },
    });
  }

  async borrarPromocion(id: number, usuarioId: number) {
    const promo = await this.prisma.promocion.findUnique({
      where: { id },
      include: { negocio: true },
    });

    if (!promo) throw new NotFoundException('Promoción no encontrada');
    if (promo.negocio.duenoId !== usuarioId)
      throw new ForbiddenException('No puedes borrar esta promoción');

    return this.prisma.promocion.delete({ where: { id } });
  }
}
