import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Usuario } from "../usuarios/entities/usuario.entity";
import { UserSeeder } from "./user.seeder";

@Module({
	imports: [TypeOrmModule.forFeature([Usuario])],
	providers: [UserSeeder],
})
export class SeedersModule {}
