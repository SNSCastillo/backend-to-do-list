import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

const MENSAJE_PROTECCION =
  'Prohibido para usuario de tipo USER, solo para ADMIN.';

@ApiBearerAuth()
@ApiUnauthorizedResponse({
  description: 'Unauthorized Bearer Auth',
})
@ApiTags('Usuarios')
@Auth(Role.ADMIN)
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Nuevo usuario creado correctamente.',
  })
  @ApiForbiddenResponse({ description: MENSAJE_PROTECCION })
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'Todos los usuarios obtenidos.',
  })
  @ApiForbiddenResponse({ description: MENSAJE_PROTECCION })
  findAll() {
    return this.usuariosService.findAll();
  }
}
