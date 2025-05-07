import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsBoolean,
  IsDate,
  IsOptional,
} from 'class-validator';

export class CreateTareaDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsDate()
  @Type(() => Date)
  fechaLimite: Date;

  @IsBoolean()
  @IsOptional()
  estado?: boolean;
}
