import {
  IsString,
  IsOptional,
  IsDateString,
  IsInt,
  IsArray,
  IsNumber,
} from 'class-validator';

export class CreatePromocionDto {
  @IsString()
  titulo: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsDateString()
  fechaCaducidad: string; // 👈 ISO date

  @IsNumber()
  descuento: number; // 👈 porcentaje o valor fijo

  @IsOptional()
  @IsInt()
  productoId?: number; // producto principal

  @IsOptional()
  @IsArray()
  packIds?: number[]; // lista de IDs de productos para el pack

  @IsInt()
  negocioId: number;
}
