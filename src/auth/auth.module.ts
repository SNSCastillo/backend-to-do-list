import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { envVars } from "../core/config/env";
import { UsuariosModule } from "../usuarios/usuarios.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
	imports: [
		UsuariosModule,
		JwtModule.register({
			secret: envVars.JWT_SECRET,
			global: true,
			signOptions: { expiresIn: "1d" },
		}),
	],
	controllers: [AuthController],
	providers: [AuthService],
	exports: [JwtModule],
})
export class AuthModule {}
