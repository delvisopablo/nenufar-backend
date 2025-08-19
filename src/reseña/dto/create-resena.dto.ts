import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateResenaDto {
  @IsInt() negocioId!: number;

  @IsInt()
  @Min(1)
  @Max(5)
  puntuacion!: number;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  contenido?: string;

  @IsBoolean()
  @IsOptional()
  selloNenufar?: boolean;
}
