import { Module } from '@nestjs/common';
import { TareasModule } from './tareas/tareas.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';
import { envVars } from '@/config/env';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: envVars.POSTGRES_HOST,
      port: envVars.POSTGRES_PORT,
      username: envVars.POSTGRES_USERNAME,
      password: envVars.POSTGRES_PASSWORD,
      database: envVars.POSTGRES_DATABASE,
      synchronize: true,
      autoLoadEntities: true,
      ssl: envVars.POSTGRES_SSL === true,
      extra:
        envVars.POSTGRES_SSL === true
          ? { ssl: { rejectUnauthorized: false } }
          : undefined,
    }),
    TareasModule,
    UsuariosModule,
    AuthModule,
  ],
})
export class AppModule { }
