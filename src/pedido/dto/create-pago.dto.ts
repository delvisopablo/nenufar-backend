import { IsEnum, IsNumber, Min } from 'class-validator';
import { MetodoPago, PagoEstado } from '@prisma/client';

export class CreatePagoDto {
  @IsEnum(MetodoPago)
  metodoPago!: MetodoPago; // TARJETA | BIZUM | EFECTIVO | STRIPE | OTRO

  @IsNumber()
  @Min(0.01)
  cantidad!: number;

  @IsEnum(PagoEstado)
  estado!: PagoEstado; // PENDIENTE | PAGADO | FALLIDO
}
