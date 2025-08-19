import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateCategoriaDto {
  @IsString()
  @IsOptional()
  @MaxLength(80)
  nombre?: string;
}
