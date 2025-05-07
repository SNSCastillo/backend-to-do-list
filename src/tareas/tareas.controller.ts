import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TareasService } from './tareas.service';
import { CreateTareaDto } from './dto/create-tarea.dto';
import { UpdateTareaDto } from './dto/update-tarea.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UpdateEstadoDto } from './dto/update.estado.dto';

@ApiBearerAuth()
@ApiUnauthorizedResponse({
  description: 'Unauthorized Bearer Auth',
})
@ApiTags('Tareas')
@Auth(Role.USER)
@Controller('tareas')
export class TareasController {
  constructor(private readonly tareasService: TareasService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Nueva tarea creado correctamente.',
  })
  create(
    @Body() createTareaDto: CreateTareaDto,
    @ActiveUser() user: UserActiveInterface,
  ) {
    return this.tareasService.create(createTareaDto, user);
  }

  @Get()
  @ApiOkResponse({
    description: 'Todas las tareas del usuario.',
  })
  findAll(@ActiveUser() user: UserActiveInterface) {
    return this.tareasService.findAll(user);
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Una tarea obtenida.',
  })
  findOne(@Param('id') id: string, @ActiveUser() user: UserActiveInterface) {
    return this.tareasService.findOne(+id, user);
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'Tarea actualizada correctamente.' })
  update(
    @Param('id') id: string,
    @Body() updateTareaDto: UpdateTareaDto,
    @ActiveUser() user: UserActiveInterface,
  ) {
    return this.tareasService.update(+id, updateTareaDto, user);
  }
  @Patch(':id/estado')
  @ApiOkResponse({ description: 'Tarea completada.' })
  updateEstado(
    @Param('id') id: string,
    @Body() updateEstadoDto: UpdateEstadoDto,
    @ActiveUser() user: UserActiveInterface,
  ) {
    return this.tareasService.updateEstatus(+id, updateEstadoDto, user);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Tarea eliminada correctamente.' })
  remove(@Param('id') id: string, @ActiveUser() user: UserActiveInterface) {
    return this.tareasService.remove(+id, user);
  }
}
