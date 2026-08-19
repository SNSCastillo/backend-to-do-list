import { Type } from "class-transformer";
import {
	IsBoolean,
	IsDate,
	IsNotEmpty,
	IsOptional,
	IsString,
} from "class-validator";

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
