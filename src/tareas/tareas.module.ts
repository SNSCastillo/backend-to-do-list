import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "../auth/auth.module";
import { Tarea } from "./entities/tarea.entity";
import { TareasController } from "./tareas.controller";
import { TareasGateway } from "./tareas.gateway";
import { TareasService } from "./tareas.service";

@Module({
	imports: [TypeOrmModule.forFeature([Tarea]), AuthModule],
	controllers: [TareasController],
	providers: [TareasService, TareasGateway],
})
export class TareasModule {}
