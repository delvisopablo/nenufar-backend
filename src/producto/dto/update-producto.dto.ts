import {
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class UpdateProductoDto {
  @IsString()
  @IsOptional()
  @MaxLength(160)
  nombre?: string;

  @IsString()
  @IsOptional()
  @MaxLength(2000)
  descripcion?: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  precio?: number;
}
