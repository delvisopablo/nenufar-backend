/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
// import { CreateLogroDto } from './dto/create-logro.dto';
// import { UpdateLogroDto } from './dto/update-logro.dto';

@Injectable()
export class LogroService {
  logrosPorUsuario(_usuarioId: number) {
    throw new Error('Method not implemented.');
  }
  asignarOIncrementar(usuarioId: number, logroId: number) {
    throw new Error('Method not implemented.');
  }
  constructor(private prisma: PrismaService) {}

  // async create(dto: CreateLogroDto) {
  //   const { categoriaId, subcategoriaId, negocioId, productoId, ...rest } = dto;

  //   return this.prisma.logro.create({
  //     data: {
  //       ...rest,
  //       tipo: dto.tipo as import('../../../../node_modules/.prisma/client').$Enums.LogroTipo,
  //       dificultad: dto.dificultad as import('../../../../node_modules/.prisma/client').$Enums.Dificultad,
  //       categoriaId: typeof categoriaId === 'number' ? categoriaId : null,
  //       subcategoriaId: typeof subcategoriaId === 'number' ? subcategoriaId : null,
  //       negocioId: typeof negocioId === 'number' ? negocioId : null,
  //       productoId: typeof productoId === 'number' ? productoId : null,
  //     },
  //   });
  // }

  async findAll() {
    return this.prisma.logro.findMany();
  }

  async findOne(id: number) {
    const logro = await this.prisma.logro.findUnique({ where: { id } });
    if (!logro) throw new NotFoundException('Logro no encontrado');
    return logro;
  }

  // async update(id: number, dto: UpdateLogroDto) {
  //   const { categoriaId, subcategoriaId, negocioId, productoId, ...rest } = dto;

  //   return this.prisma.logro.update({
  //     where: { id },
  //     data: {
  //       ...rest,
  //       tipo: dto.tipo !== undefined ? dto.tipo : undefined,
  //       dificultad: dto.dificultad !== undefined ? { set: dto.dificultad } : undefined,
  //       categoriaId: typeof categoriaId === 'number' ? categoriaId : null,
  //       subcategoriaId: typeof subcategoriaId === 'number' ? subcategoriaId : null,
  //       negocioId: typeof negocioId === 'number' ? negocioId : null,
  //       productoId: typeof productoId === 'number' ? productoId : null,
  //     },
  //   });
  // }

  async remove(id: number) {
    return this.prisma.logro.delete({ where: { id } });
  }
}
