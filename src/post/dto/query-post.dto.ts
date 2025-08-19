/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class QueryPostDto {
  @IsOptional()
  @IsEnum(['resena', 'promocion', 'logro'], {
    message: "tipo debe ser 'resena' | 'promocion' | 'logro'",
  } as any)
  tipo?: 'resena' | 'promocion' | 'logro';

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  usuarioId?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  negocioId?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number;

  @IsOptional()
  @IsString()
  q?: string; // por si quieres buscar en contenido de la reseña
}
