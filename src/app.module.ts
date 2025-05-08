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
      type: envVars.TYPE as 'mysql' | 'mariadb' | 'postgres' | 'mongodb',
      host: envVars.HOST,
      port: envVars.DB_PORT,
      username: envVars.NAMEUSER,
      password: envVars.PASSWORD,
      database: envVars.DATABASE,
      synchronize: true,
      autoLoadEntities: true,
      ssl: envVars.SSL
    }),
    TareasModule,
    UsuariosModule,
    AuthModule,
  ],
})
export class AppModule { }
