import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateTareaDto } from './dto/create-tarea.dto';
import { UpdateTareaDto } from './dto/update-tarea.dto';
import { Tarea } from './entities/tarea.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface';
import { TareasGateway } from './tareas.gateway';
import { Role } from 'src/common/enums/rol.enum';
import { UpdateEstadoDto } from './dto/update.estado.dto';

@Injectable()
export class TareasService {
  constructor(
    @InjectRepository(Tarea) private readonly tareaRepository: Repository<Tarea>,
    private readonly tareasGateway: TareasGateway
  ) { }

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
        userEmail: user.email
      }
    });
    this.tareasGateway.emitirTareasObtenidas(tareas, user);
    return tareas;
  }

  async findOne(id: number, user: UserActiveInterface) {
    const tarea = await this.tareaRepository.findOneBy({ id })
    if (!tarea) {
      throw new BadRequestException(`Tarea con id ${id} no existe`);
    }
    this.validarPropietario(tarea, user);
    return tarea;
  }

  async update(id: number, updateTareaDto: UpdateTareaDto, user: UserActiveInterface) {
    await this.findOne(id, user);

    const tareaActualizada = await this.tareaRepository.update(id, {
      ...updateTareaDto,
      userEmail: user.email
    });
    this.tareasGateway.emitirTareaActualizada(updateTareaDto, user);
    return tareaActualizada;
  }
  async updateEstatus(id: number, updateEstadoDto: UpdateEstadoDto, user: UserActiveInterface) {
    await this.findOne(id, user);

    const tareaActualizada = await this.tareaRepository.update(id, {
      ...updateEstadoDto,
      userEmail: user.email
    });
    this.tareasGateway.emitirTareaTerminada(updateEstadoDto, user);
    return tareaActualizada;
  }

  async remove(id: number, user: UserActiveInterface) {
    await this.findOne(id, user);
    this.tareasGateway.emitirTareaEliminada(id, user);
    return await this.tareaRepository.delete(id);
  }

  private validarPropietario(tarea: Tarea, user: UserActiveInterface) {
    if (user.role !== Role.ADMIN && tarea.userEmail !== user.email) {
      throw new UnauthorizedException('No está permitido ver a esta tarea')
    }
  }
}
