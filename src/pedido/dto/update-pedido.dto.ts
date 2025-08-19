import { IsEnum, IsOptional } from 'class-validator';
import { PedidoEstado } from '@prisma/client';

export class UpdatePedidoDto {
  @IsEnum(PedidoEstado)
  @IsOptional()
  estado?: PedidoEstado; // PENDIENTE | COMPLETADO | CANCELADO
}
