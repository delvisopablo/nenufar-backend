import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.enableCors({
    origin: ['http://localhost:4200'], // tu Angular
    credentials: true, // <-- importante para cookies
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const cfg = new DocumentBuilder()
    .setTitle('Nenúfar API')
    .setVersion('1.0')
    .addCookieAuth('access_token') // cookies en Swagger
    .build();
  const doc = SwaggerModule.createDocument(app, cfg);
  SwaggerModule.setup('docs', app, doc);

  await app.listen(process.env.PORT || 3000);
}
void bootstrap();

// Este código inicializa la aplicación NestJS y aplica un pipe global de validación.
// El pipe de validación se encarga de validar los datos de entrada en las solicitudes HTTP.
