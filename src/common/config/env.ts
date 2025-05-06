import { Configuration, Value } from "@itgorillaz/configify"
import { Injectable } from "@nestjs/common";
import { IsEmail, IsNotEmpty } from "class-validator";

@Injectable()
@Configuration()
export class DataBaseConfiguration {
    @IsNotEmpty()
    @Value('POSTGRES_HOST')
    postgresHost: string;

    @IsNotEmpty()
    @Value('POSTGRES_PORT', {
        parse: parseInt
    })
    port: number;

    @IsNotEmpty()
    @Value('POSTGRES_USERNAME')
    postgresUserName: string;

    @IsNotEmpty()
    @Value('POSTGRES_PASSWORD')
    password: string;

    @IsNotEmpty()
    @Value('POSTGRES_DATABASE')
    postgresDataBase: string;
}

@Injectable()
@Configuration()
export class InfoUser {
    @IsNotEmpty()
    @IsEmail()
    @Value('CORREO')
    correo: string;

    @IsNotEmpty()
    @Value('CORREO_PASSWORD')
    password: string;
}

@Injectable()
@Configuration()
export class JtwSecret {
    @IsNotEmpty()
    @Value('JWT_SECRET')
    jtwSecret: string;

}