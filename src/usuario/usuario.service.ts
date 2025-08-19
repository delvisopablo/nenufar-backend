// src/usuario/usuario.service.ts
import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import * as bcrypt from 'bcrypt';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Usuario } from '@prisma/client';

@Injectable()
export class UsuarioService {
  constructor(private prisma: PrismaService) {}

  async crearUsuario(dto: CreateUsuarioDto) {
    const existe = await this.prisma.usuario.findUnique({
      where: { email: dto.email },
    });

    if (existe) {
      throw new ConflictException('El email ya está en uso');
    }

    const hash = await bcrypt.hash(dto.password, 10);

    const usuario = await this.prisma.usuario.create({
      data: {
        nombre: dto.nombre,
        nickname: dto.nickname,
        email: dto.email,
        password: hash,
        foto: dto.fotoPerfil,
        biografia: dto.biografia,
      },
      select: {
        id: true,
        nombre: true,
        nickname: true,
        email: true,
        foto: true,
        biografia: true,
      },
    });

    return usuario;
  }

  async getPerfil(id: number) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id },
      include: {
        resenas: true,
        // Si tienes logros o promociones relacionadas, añádelas aquí
      },
    });
    return usuario;
  }

  async buscarPorEmail(email: string): Promise<any> {
    return this.prisma.usuario.findUnique({
      where: { email },
      select: {
        id: true,
        nickname: true,
        email: true,
        password: true,
        nombre: true,
      },
    });
  }

  async borrarUsuario(id: number) {
    return this.prisma.usuario.delete({
      where: { id: Number(id) },
    });
  }
}
