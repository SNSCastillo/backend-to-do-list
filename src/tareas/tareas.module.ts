import { Module } from '@nestjs/common';
import { TareasService } from './tareas.service';
import { TareasController } from './tareas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tarea } from './entities/tarea.entity';
import { AuthModule } from 'src/auth/auth.module';
import { TareasGateway } from './tareas.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Tarea]), AuthModule],
  controllers: [TareasController],
  providers: [TareasService, TareasGateway],
})
export class TareasModule { }
