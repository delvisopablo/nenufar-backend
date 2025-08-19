import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ResenaService } from './reseña/resena.service';
import { PromocionService } from './promocion/promocion.service';

@Controller('inicio')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly resenaService: ResenaService,
    private readonly promocionService: PromocionService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get()
  async inicio() {
    const resenas = await this.resenaService.todasLasResenas();
    const promos = this.promocionService.getPromos();
    return {
      bienvenida: '¡Bienvenido a Nenúfar!',
      resenas,
      promos,
    };
  }
}
