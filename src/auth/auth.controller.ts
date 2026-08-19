import { Body, Controller, Post } from "@nestjs/common";
import type { AuthService } from "./auth.service";
import type { LoginDto } from "./dto/login.dto";
import type { RegisterDto } from "./dto/register.dto";

@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post("registro")
	registro(@Body() registerDto: RegisterDto) {
		return this.authService.registro(registerDto);
	}

	@Post("login")
	login(@Body() loginDto: LoginDto) {
		return this.authService.login(loginDto);
	}
}
