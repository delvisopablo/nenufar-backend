/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
 

//
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';

function parseTTL(s?: string, fallbackSeconds = 900) {
  if (!s) return fallbackSeconds;
  if (s.endsWith('s')) return parseInt(s, 10);
  if (s.endsWith('m')) return parseInt(s, 10) * 60;
  if (s.endsWith('h')) return parseInt(s, 10) * 3600;
  if (s.endsWith('d')) return parseInt(s, 10) * 86400;
  const n = Number(s);
  return Number.isFinite(n) ? n : fallbackSeconds;
}

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  private cookieOpts(ttlSeconds: number) {
    const isProd = process.env.NODE_ENV === 'production';
    return {
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax' as const,
      maxAge: ttlSeconds * 1000,
      domain: process.env.COOKIE_DOMAIN || 'localhost',
      path: '/',
    };
  }

  private async signTokens(user: {
    id: number;
    email: string;
    nickname: string;
  }) {
    const accessTTL = parseTTL(process.env.JWT_ACCESS_TTL, 900);
    const refreshTTL = parseTTL(process.env.JWT_REFRESH_TTL, 60 * 60 * 24 * 30);

    const access = await this.jwt.signAsync(
      { sub: user.id, email: user.email, nickname: user.nickname },
      { secret: process.env.JWT_ACCESS_SECRET, expiresIn: accessTTL },
    );
    const refresh = await this.jwt.signAsync(
      { sub: user.id, email: user.email, nickname: user.nickname },
      { secret: process.env.JWT_REFRESH_SECRET, expiresIn: refreshTTL },
    );
    return { access, refresh, accessTTL, refreshTTL };
  }

  async register(dto: RegisterDto) {
    const exists = await this.prisma.usuario.findFirst({
      where: { OR: [{ email: dto.email }, { nickname: dto.nickname }] },
    });
    if (exists) throw new BadRequestException('Email o nickname ya en uso');

    const hash = await bcrypt.hash(dto.password, 10);
    return this.prisma.usuario.create({
      data: {
        nombre: dto.nombre.trim(),
        nickname: dto.nickname.trim(),
        email: dto.email.toLowerCase().trim(),
        password: hash,
      },
      select: {
        id: true,
        nombre: true,
        nickname: true,
        email: true,
        creadoEn: true,
      },
    });
  }

  async login(dto: LoginDto, res: Response) {
    const user = await this.prisma.usuario.findUnique({
      where: { email: dto.email.toLowerCase().trim() },
    });
    if (!user) throw new UnauthorizedException('Credenciales inválidas');

    const ok = await bcrypt.compare(dto.password, user.password);
    if (!ok) throw new UnauthorizedException('Credenciales inválidas');

    const { access, refresh, accessTTL, refreshTTL } = await this.signTokens({
      id: user.id,
      email: user.email,
      nickname: user.nickname,
    });

    res.cookie('access_token', access, this.cookieOpts(accessTTL));
    res.cookie('refresh_token', refresh, this.cookieOpts(refreshTTL));

    return {
      id: user.id,
      nombre: user.nombre,
      nickname: user.nickname,
      email: user.email,
    };
  }

  async refresh(req: Request, res: Response) {
    const payload: any = req.user; // lo metemos luego con guard/strategy
    if (!payload?.sub) throw new UnauthorizedException();

    const { access, refresh, accessTTL, refreshTTL } = await this.signTokens({
      id: payload.sub,
      email: payload.email,
      nickname: payload.nickname,
    });

    res.cookie('access_token', access, this.cookieOpts(accessTTL));
    res.cookie('refresh_token', refresh, this.cookieOpts(refreshTTL));

    return { ok: true };
  }

  logout(res: Response) {
    res.clearCookie('access_token', { path: '/' });
    res.clearCookie('refresh_token', { path: '/' });
    return { ok: true };
  }

  async me(req: Request) {
    const payload: any = req.user;
    if (!payload?.sub) throw new UnauthorizedException();

    return this.prisma.usuario.findUnique({
      where: { id: payload.sub },
      select: {
        id: true,
        nombre: true,
        nickname: true,
        email: true,
        foto: true,
        petalosSaldo: true,
        creadoEn: true,
      },
    });
  }
}

