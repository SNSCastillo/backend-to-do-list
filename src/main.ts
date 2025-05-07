import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envVars } from './core/config/env';


async function bootstrap() {
  const logger = new Logger('Main');

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('prueba/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableCors({
    origin: ['http://localhost:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Cookies o auth con sesiones
  });

  // Enable Swagger if the environment variable is set to true
  if (envVars!.ENABLE_SWAGGER === true) {
    const { setupSwagger } = await import("./core/config/swagger");
    setupSwagger(app);
  }

  await app.listen(process.env.PORT ?? 4000);
  logger.log(`Documentación con Swagger: ${await app.getUrl()}/${envVars.SWAGGER_URL}`);
}
bootstrap();
