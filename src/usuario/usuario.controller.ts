import {
  Controller,
  Post,
  Body,
  Get,
  // UseGuards,
  // Req,
  Delete,
  Param,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
// import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  async crearUsuario(@Body() dto: CreateUsuarioDto) {
    return this.usuarioService.crearUsuario(dto);
  }

  @Get(':id')
  async getPerfil(@Param('id') id: string) {
    return this.usuarioService.getPerfil(Number(id));
  }

  // @UseGuards(JwtAuthGuard)
  // @Get('perfil')
  // getPerfil(@Req() req) {
  //   return {
  //     message: 'Ruta protegida OK',
  //     usuario: req.user,
  //   };
  // }

  @Delete(':id')
  async borrarUsuario(@Param('id') id: number) {
    return this.usuarioService.borrarUsuario(id);
  }
}
