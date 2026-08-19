import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class RegisterDto {
	@IsString()
	@MinLength(1)
	name: string;

	@IsEmail()
	@IsNotEmpty()
	email: string;

	@IsString()
	@MinLength(6)
	@Transform(({ value }) => value.trim())
	@IsNotEmpty()
	password: string;
}
