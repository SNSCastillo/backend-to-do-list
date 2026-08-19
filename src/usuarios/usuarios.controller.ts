import { Body, Controller, Get, Post } from "@nestjs/common";
import {
	ApiBearerAuth,
	ApiCreatedResponse,
	ApiForbiddenResponse,
	ApiOkResponse,
	ApiTags,
	ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { Auth } from "../auth/decorators/auth.decorator";
import { Role } from "../common/enums/rol.enum";
import type { CreateUsuarioDto } from "./dto/create-usuario.dto";
import type { UsuariosService } from "./usuarios.service";

const MENSAJE_PROTECCION =
	"Prohibido para usuario de tipo USER, solo para ADMIN.";

@ApiBearerAuth()
@ApiUnauthorizedResponse({
	description: "Unauthorized Bearer Auth",
})
@ApiTags("Usuarios")
@Auth(Role.ADMIN)
@Controller("usuarios")
export class UsuariosController {
	constructor(private readonly usuariosService: UsuariosService) {}

	@Post()
	@ApiCreatedResponse({
		description: "Nuevo usuario creado correctamente.",
	})
	@ApiForbiddenResponse({ description: MENSAJE_PROTECCION })
	create(@Body() createUsuarioDto: CreateUsuarioDto) {
		return this.usuariosService.create(createUsuarioDto);
	}

	@Get()
	@ApiOkResponse({
		description: "Todos los usuarios obtenidos.",
	})
	@ApiForbiddenResponse({ description: MENSAJE_PROTECCION })
	findAll() {
		return this.usuariosService.findAll();
	}
}
