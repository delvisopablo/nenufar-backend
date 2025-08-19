import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export enum LogroTipo {
  GENERICO = 'GENERICA',
  RESEÑA = 'RESEÑA',
  NEGOCIO = 'NEGOCIO',
  PRODUCTO = 'PRODUCTO',
}

export enum Dificultad {
  FACIL = 'FACIL',
  MEDIA = 'MEDIA',
  DIFICIL = 'DIFICIL',
}

export class CreateLogroDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsEnum(LogroTipo)
  tipo: LogroTipo;

  @IsEnum(Dificultad)
  dificultad: Dificultad = Dificultad.FACIL;

  @IsInt()
  @Min(1)
  umbral: number;

  @IsInt()
  recompensaPuntos: number;

  @IsOptional()
  @IsInt()
  categoriaId?: number;

  @IsOptional()
  @IsInt()
  subcategoriaId?: number;

  @IsOptional()
  @IsInt()
  negocioId?: number;

  @IsOptional()
  @IsInt()
  productoId?: number;
}
