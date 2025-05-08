import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { RegisterDto } from './dto/register.dto';
import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly jwtService: JwtService,
  ) { }
  async registro({ password, email, name }: RegisterDto) {
    const ususario = await this.usuariosService.findOneByEmail(email!);
    if (ususario) {
      return { success: false, message: "El usuario ya existe." };
    }

    await this.usuariosService.create({
      name,
      email,
      password: await bcryptjs.hash(password!, 10),
    });

    return {
      success: true,
      message: 'Usuario creado correctamente',
    };
  }

  async login({ email, password }: LoginDto) {
    const usuario = await this.usuariosService.findByEmailWithPassword(email!);
    if (!usuario) {
      throw new Error('El usuario no existe');
    }
    const passwordOk = await bcryptjs.compare(password!, usuario.password!);

    if (!passwordOk) {
      throw new UnauthorizedException('La contraseña es incorrecta');
    }

    const payload = {
      email: usuario.email,
      role: usuario.role,
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      token: token,
      email: usuario.email,
    };
  }
}
