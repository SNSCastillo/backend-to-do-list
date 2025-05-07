import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { JwtModule } from '@nestjs/jwt';
import { envVars } from '@/core/config/env';

@Module({
  imports: [
    UsuariosModule,
    JwtModule.register({
      secret: envVars.JWT_SECRET,
      global: true,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [JwtModule],
})
export class AuthModule { }
