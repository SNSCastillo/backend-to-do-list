import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import type { Repository } from "typeorm";
import type { CreateUsuarioDto } from "./dto/create-usuario.dto";
import { Usuario } from "./entities/usuario.entity";

@Injectable()
export class UsuariosService {
	constructor(
		@InjectRepository(Usuario)
		private readonly usuarioRepository: Repository<Usuario>,
	) {}
	async create(createUsuarioDto: CreateUsuarioDto) {
		return await this.usuarioRepository.save(createUsuarioDto);
	}

	findOneByEmail(email: string) {
		return this.usuarioRepository.findOneBy({ email });
	}
	findByEmailWithPassword(email: string) {
		return this.usuarioRepository.findOne({
			where: { email },
			select: ["id", "name", "email", "password", "role"],
		});
	}

	findAll() {
		return this.usuarioRepository.find();
	}
}
