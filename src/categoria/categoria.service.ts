import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

function toPaging(page?: number | string, limit?: number | string) {
  const p = Math.max(1, Number(page ?? 1) | 0);
  const l = Math.max(1, Math.min(100, Number(limit ?? 20) | 0));
  return { skip: (p - 1) * l, take: l };
}

@Injectable()
export class CategoriaService {
  constructor(private prisma: PrismaService) {}

  async list(params: {
    q?: string;
    sort?: 'nombre' | '-nombre';
    page?: number | string;
    limit?: number | string;
    includeCounts?: boolean | string;
    includeSubcategorias?: boolean | string;
  }) {
    const { q, sort, page, limit, includeCounts, includeSubcategorias } = params;
    const { skip, take } = toPaging(page, limit);

    const where = q
      ? { nombre: { contains: q, mode: 'insensitive' as const } }
      : undefined;

    const orderBy =
      sort === '-nombre' ? { nombre: 'desc' as const } : { nombre: 'asc' as const };

    const include: any = {};
    // si quieres contar negocios por categoría
    if (includeCounts === true || String(includeCounts).toLowerCase() === 'true') {
      include._count = { select: { negocios: true } };
    }
    // solo funciona si tienes el modelo Subcategoria en prisma
    if (
      includeSubcategorias === true ||
      String(includeSubcategorias).toLowerCase() === 'true'
    ) {
      include.subcategorias = true;
    }

    const [items, total] = await this.prisma.$transaction([
      this.prisma.categoria.findMany({ where, orderBy, skip, take, include }),
      this.prisma.categoria.count({ where }),
    ]);

    return { items, total, page: Number(page ?? 1), limit: Number(limit ?? 20) };
  }

  async getById(id: number, opts?: { includeCounts?: boolean; includeSubcategorias?: boolean }) {
    const include: any = {};
    if (opts?.includeCounts) include._count = { select: { negocios: true } };
    if (opts?.includeSubcategorias) include.subcategorias = true;

    const cat = await this.prisma.categoria.findUnique({ where: { id }, include });
    if (!cat) throw new NotFoundException('Categoría no encontrada');
    return cat;
  }

  async create(dto: CreateCategoriaDto) {
    try {
      return await this.prisma.categoria.create({
        data: { nombre: dto.nombre.trim() },
      });
    } catch (e: any) {
      if (e?.code === 'P2002')
        throw new ConflictException('Ya existe una categoría con ese nombre');
      throw e;
    }
  }

  async update(id: number, dto: UpdateCategoriaDto) {
    try {
      return await this.prisma.categoria.update({
        where: { id },
        data: { ...dto, nombre: dto.nombre?.trim() },
      });
    } catch (e: any) {
      if (e?.code === 'P2002')
        throw new ConflictException('Ya existe una categoría con ese nombre');
      if (e?.code === 'P2025') throw new NotFoundException('Categoría no encontrada');
      throw e;
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.categoria.delete({ where: { id } });
    } catch (e: any) {
      if (e?.code === 'P2003')
        throw new BadRequestException(
          'No se puede eliminar: tiene elementos vinculados (negocios/subcategorías)',
        );
      if (e?.code === 'P2025') throw new NotFoundException('Categoría no encontrada');
      throw e;
    }
  }
}
