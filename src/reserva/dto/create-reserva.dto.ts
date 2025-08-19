import { IsDateString, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateReservaDto {
  @IsDateString()
  fecha!: string; // ISO (start). Debe caer en un slot disponible generado

  @IsString()
  @IsOptional()
  @MaxLength(500)
  nota?: string;
}
