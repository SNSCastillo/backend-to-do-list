import { IsEmail, IsNotEmpty, IsString, MinLength, Matches } from "class-validator";
import { Transform } from "class-transformer";

export class CreateUsuarioDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Transform(({ value }) => value?.trim())
  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
    message: 'La contraseña debe incluir al menos una mayúscula, un número y un carácter especial',
  })
  password: string;

  @Transform(({ value }) => value?.trim())
  @IsString()
  @IsNotEmpty()
  name: string;
}
