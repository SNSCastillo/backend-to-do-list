import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./auth/auth.module";
import { envVars } from "./core/config/env";
import { TaskModule } from "./modules/task/tareas.module";
import { UsersModule } from "./modules/users/usuarios.module";
import { SeedersModule } from "./seeders/seeders.module";

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
		TaskModule,
		UsersModule,
		AuthModule,
		SeedersModule,
	],
})
export class AppModule {}
