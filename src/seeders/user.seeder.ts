import { Injectable, Logger, type OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcryptjs";
import type { Repository } from "typeorm";
import { Role } from "../common/enums/rol.enum";
import { envVars } from "../core/config/env";
import { Usuario } from "../usuarios/entities/usuario.entity";

@Injectable()
export class UserSeeder implements OnModuleInit {
	private readonly logger = new Logger(UserSeeder.name);

	constructor(
		@InjectRepository(Usuario)
		private readonly usuarioRepository: Repository<Usuario>,
	) {}

	async onModuleInit(): Promise<void> {
		const { CORREO: email, CORREO_PASSWORD: password } = envVars;

		if (!email || !password) {
			this.logger.error(
				"Correo o contraseña no está configurado en las variables de entorno.",
			);
			return;
		}

		try {
			const userExists = await this.usuarioRepository.findOne({
				where: { email },
			});

			if (userExists) {
				return;
			}

			await this.usuarioRepository.save({
				role: Role.USER,
				name: "NombreUser",
				email,
				password: await bcrypt.hash(String(password), 10),
			});

			this.logger.log(`Usuario inicial creado: ${email}`);
		} catch (error) {
			this.logger.error("Error al crear el usuario inicial", error);
		}
	}
}
