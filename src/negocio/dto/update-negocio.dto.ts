import {
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class UpdateNegocioDto {
  @IsString()
  @IsOptional()
  @MaxLength(120)
  nombre?: string;

  @IsString()
  @IsOptional()
  @MaxLength(2000)
  historia?: string | null;

  @IsDateString()
  @IsOptional()
  fechaFundacion?: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  direccion?: string | null;

  @IsInt()
  @IsOptional()
  categoriaId?: number;

  @IsInt()
  @IsOptional()
  subcategoriaId?: number;

  @IsInt()
  @IsOptional()
  @Min(5)
  intervaloReserva?: number;

  @IsOptional()
  horario?: any;
}
