import {
  IsString,
  IsOptional,
  IsDateString,
  IsNumber,
  IsInt,
  IsArray,
} from 'class-validator';

export class UpdatePromocionDto {
  @IsOptional()
  @IsString()
  titulo?: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsDateString()
  fechaCaducidad?: string;

  @IsOptional()
  @IsNumber()
  descuento?: number;

  @IsOptional()
  @IsInt()
  productoId?: number;

  @IsOptional()
  @IsArray()
  packIds?: number[];
}
