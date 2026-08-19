import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
} from "@nestjs/common";
import {
	ApiBearerAuth,
	ApiCreatedResponse,
	ApiOkResponse,
	ApiTags,
	ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { Auth } from "../auth/decorators/auth.decorator";
import { ActiveUser } from "../common/decorators/active-user.decorator";
import { Role } from "../common/enums/rol.enum";
import type { UserActiveInterface } from "../common/interfaces/user-active.interface";
import type { CreateTareaDto } from "./dto/create-tarea.dto";
import type { UpdateEstadoDto } from "./dto/update.estado.dto";
import type { UpdateTareaDto } from "./dto/update-tarea.dto";
import type { TareasService } from "./tareas.service";

@ApiBearerAuth()
@ApiUnauthorizedResponse({
	description: "Unauthorized Bearer Auth",
})
@ApiTags("Tareas")
@Auth(Role.USER)
@Controller("tareas")
export class TareasController {
	constructor(private readonly tareasService: TareasService) {}

	@Post()
	@ApiCreatedResponse({
		description: "Nueva tarea creado correctamente.",
	})
	create(
		@Body() createTareaDto: CreateTareaDto,
		@ActiveUser() user: UserActiveInterface,
	) {
		return this.tareasService.create(createTareaDto, user);
	}

	@Get()
	@ApiOkResponse({
		description: "Todas las tareas del usuario.",
	})
	findAll(@ActiveUser() user: UserActiveInterface) {
		return this.tareasService.findAll(user);
	}

	@Get(":id")
	@ApiOkResponse({
		description: "Una tarea obtenida.",
	})
	findOne(@Param("id") id: string, @ActiveUser() user: UserActiveInterface) {
		return this.tareasService.findOne(+id, user);
	}

	@Patch(":id")
	@ApiOkResponse({ description: "Tarea actualizada correctamente." })
	update(
		@Param("id") id: string,
		@Body() updateTareaDto: UpdateTareaDto,
		@ActiveUser() user: UserActiveInterface,
	) {
		return this.tareasService.update(+id, updateTareaDto, user);
	}
	@Patch(":id/estado")
	@ApiOkResponse({ description: "Tarea completada." })
	updateEstado(
		@Param("id") id: string,
		@Body() updateEstadoDto: UpdateEstadoDto,
		@ActiveUser() user: UserActiveInterface,
	) {
		return this.tareasService.updateEstatus(+id, updateEstadoDto, user);
	}

	@Delete(":id")
	@ApiOkResponse({ description: "Tarea eliminada correctamente." })
	remove(@Param("id") id: string, @ActiveUser() user: UserActiveInterface) {
		return this.tareasService.remove(+id, user);
	}
}
