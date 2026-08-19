import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./auth/auth.module";
import { envVars } from "./core/config/env";
import { SeedersModule } from "./seeders/seeders.module";
import { TareasModule } from "./tareas/tareas.module";
import { UsuariosModule } from "./usuarios/usuarios.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),

		TypeOrmModule.forRoot({
			type: envVars.TYPE as "mysql" | "mariadb" | "postgres" | "mongodb",
			host: envVars.HOST,
			port: envVars.DB_PORT,
			username: envVars.NAMEUSER,
			password: envVars.PASSWORD,
			database: envVars.DATABASE,
			synchronize: true,
			autoLoadEntities: true,
			ssl: envVars.SSL,
		}),
		TareasModule,
		UsuariosModule,
		AuthModule,
		SeedersModule,
	],
})
export class AppModule {}
