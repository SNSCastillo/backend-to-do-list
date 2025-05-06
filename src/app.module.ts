import { Module } from '@nestjs/common';
import { TareasModule } from './tareas/tareas.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('POSTGRES_HOST'),
        port: parseInt(config.get('POSTGRES_PORT') || '5432'),
        username: config.get('POSTGRES_USERNAME'),
        password: config.get('POSTGRES_PASSWORD'),
        database: config.get('POSTGRES_DATABASE'),
        synchronize: true,
        autoLoadEntities: true,
        ssl: config.get('POSTGRES_SSL') === 'true',
        extra: config.get('POSTGRES_SSL') === 'true'
          ? { ssl: { rejectUnauthorized: false } }
          : undefined,
      }),
    }),
    TareasModule,
    UsuariosModule,
    AuthModule,
  ],
})
export class AppModule { }

