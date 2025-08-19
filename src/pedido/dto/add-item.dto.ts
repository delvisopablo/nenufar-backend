import { IsInt, Min } from 'class-validator';

export class AddItemDto {
  @IsInt() productoId!: number;
  @IsInt() @Min(1) cantidad!: number;
}
