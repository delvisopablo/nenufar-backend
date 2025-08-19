import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class UpdateResenaDto {
  @IsInt()
  @IsOptional()
  @Min(1)
  @Max(5)
  puntuacion?: number;

  @IsString()
  @IsOptional()
  contenido?: string;

  @IsBoolean()
  @IsOptional()
  selloNenufar?: boolean; // 👈 añadido
}
