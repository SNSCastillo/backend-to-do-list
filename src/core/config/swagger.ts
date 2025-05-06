import { INestApplication, Logger } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { envVars } from "@/config/env";

const logger = new Logger("Swagger");

export function setupSwagger(app: INestApplication): void {
    const config = new DocumentBuilder()
        .setTitle("TO-DO-LIST")
        .setDescription("Documentation")
        .setVersion("1.0")
        .addBearerAuth()
        .build();

    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(envVars.SWAGGER_URL, app, documentFactory, {
        jsonDocumentUrl: envVars.SWAGGER_JSON_URL,
    });

    logger.log(
        `📚 Swagger available at ${URL}/${envVars!.SWAGGER_URL}`,
    );
}