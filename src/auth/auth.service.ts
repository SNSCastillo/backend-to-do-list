import { Injectable } from "@nestjs/common";
import type { JwtService } from "@nestjs/jwt";
import * as bcryptjs from "bcryptjs";
import type { UsuariosService } from "../usuarios/usuarios.service";
import type { LoginDto } from "./dto/login.dto";
import type { RegisterDto } from "./dto/register.dto";

@Injectable()
export class AuthService {
	constructor(
		private readonly usuariosService: UsuariosService,
		private readonly jwtService: JwtService,
	) {}
	async registro({ password, email, name }: RegisterDto) {
		const ususario = await this.usuariosService.findOneByEmail(email);
		if (ususario) {
			return { success: false, message: "El usuario ya existe." };
		}

		await this.usuariosService.create({
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
		const usuario = await this.usuariosService.findByEmailWithPassword(email);
		if (!usuario) {
			return { success: false, message: "El usuario no existe." };
		}
		const passwordOk = await bcryptjs.compare(password, usuario.password);

		if (!passwordOk) {
			return { success: false, message: "Contraseña incorrecta." };
		}

		const payload = {
			email: usuario.email,
			role: usuario.role,
		};

		const token = await this.jwtService.signAsync(payload);

		return {
			token: token,
			email: email,
		};
	}
}
