import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { UsersModule } from "@/modules/users/usuarios.module";
import { envVars } from "../core/config/env";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
	imports: [
		UsersModule,
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
