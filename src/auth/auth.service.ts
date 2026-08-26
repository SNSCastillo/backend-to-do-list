import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcryptjs from "bcryptjs";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { UsuariosService } from "@/modules/users/usuarios.service";

@Injectable()
export class AuthService {
	constructor(
		private userService: UsuariosService,
		private readonly jwtService: JwtService,
	) {}
	async registro({ password, email, name }: RegisterDto) {
		const ususario = await this.userService.findOneByEmail(email);
		if (ususario) {
			return { success: false, message: "El usuario ya existe." };
		}

		await this.userService.create({
			name,
			email,
			password: await bcryptjs.hash(password, 10),
		});

		return {
			success: true,
			message: "Usuario creado correctamente",
		};
	}

	async login({ email, password }: LoginDto) {
		const user = await this.userService.findByEmailWithPassword(email);
		if (!user) {
			return { success: false, message: "El usuario no existe." };
		}
		const passwordOk = await bcryptjs.compare(password, user.password);

		if (!passwordOk) {
			return { success: false, message: "Contraseña incorrecta." };
		}

		const payload = {
			email: user.email,
			role: user.role,
		};

		const token = await this.jwtService.signAsync(payload);

		return {
			token: token,
			email: email,
			name: user.name,
		};
	}
}
