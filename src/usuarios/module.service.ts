import { Logger } from '@nestjs/common';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { Role } from 'src/common/enums/rol.enum';
import * as bcrypt from 'bcryptjs';
import { envVars } from 'src/core/config/env';

@Injectable()
export class UserService implements OnModuleInit {
  private readonly logger = new Logger('Service Especial');

  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) { }

  async onModuleInit() {
    try {
      const email = envVars.CORREO;
      const passwordEnv = envVars.CORREO_PASSWORD;

      if (!email || !passwordEnv) {
        this.logger.error(
          'Correo o contraseña no está configurado en las variables de entorno.',
        );
        return;
      }

      const password = String(passwordEnv);

      const userExists = await this.usuarioRepository.findOne({
        where: { email },
      });

      if (!userExists) {
        const passwordHash = await bcrypt.hash(password, 10);

        await this.usuarioRepository.save({
          role: Role.USER,
          name: 'NombreUser',
          email,
          password: passwordHash,
        });

        this.logger.log(`Usuario inicial creado: ${email}`);
      }
    } catch (error) {
      this.logger.error('Error al crear el usuario inicial', error);
    }
  }
}
