import {
	BadRequestException,
	Injectable,
	UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Role } from "../../common/enums/rol.enum";
import { UserActiveInterface } from "../../common/interfaces/user-active.interface";
import { Tarea } from "../../entities/tarea.entity";
import { CreateTareaDto } from "./dto/create-tarea.dto";
import { UpdateEstadoDto } from "./dto/update.estado.dto";
import { UpdateTareaDto } from "./dto/update-tarea.dto";
import { TareasGateway } from "./tareas.gateway";

@Injectable()
export class TareasService {
	constructor(
		@InjectRepository(Tarea)
		private readonly tareaRepository: Repository<Tarea>,
		private readonly tareasGateway: TareasGateway,
	) {}

	async create(createTareaDto: CreateTareaDto, user: UserActiveInterface) {
		const nuevaTarea = await this.tareaRepository.save({
			...createTareaDto,
			userEmail: user.email,
		});
		this.tareasGateway.emitirNuevaTarea(nuevaTarea, user);
		return nuevaTarea;
	}

	async findAll(user: UserActiveInterface) {
		if (user.role === Role.ADMIN) {
			return await this.tareaRepository.find();
		}
		const tareas = await this.tareaRepository.find({
			where: {
				userEmail: user.email,
			},
		});
		this.tareasGateway.emitirTareasObtenidas(tareas, user);
		return tareas;
	}

	async findOne(id: string, user: UserActiveInterface) {
		const tarea = await this.tareaRepository.findOneBy({ id });
		if (!tarea) {
			throw new BadRequestException(`Tarea con id ${id} no existe`);
		}
		this.validarPropietario(tarea, user);
		return tarea;
	}

	async update(
		id: string,
		updateTareaDto: UpdateTareaDto,
		user: UserActiveInterface,
	) {
		await this.findOne(id, user);

		const tareaActualizada = await this.tareaRepository.update(id, {
			...updateTareaDto,
			userEmail: user.email,
		});
		this.tareasGateway.emitirTareaActualizada(updateTareaDto, user);
		return tareaActualizada;
	}
	async updateEstatus(
		id: string,
		updateEstadoDto: UpdateEstadoDto,
		user: UserActiveInterface,
	) {
		await this.findOne(id, user);

		const tareaActualizada = await this.tareaRepository.update(id, {
			...updateEstadoDto,
			userEmail: user.email,
		});
		this.tareasGateway.emitirTareaTerminada(updateEstadoDto, user);
		return tareaActualizada;
	}

	async remove(id: string, user: UserActiveInterface) {
		await this.findOne(id, user);
		this.tareasGateway.emitirTareaEliminada(id, user);
		return await this.tareaRepository.delete(id);
	}

	private validarPropietario(tarea: Tarea, user: UserActiveInterface) {
		if (user.role !== Role.ADMIN && tarea.userEmail !== user.email) {
			throw new UnauthorizedException("No está permitido ver a esta tarea");
		}
	}
}
