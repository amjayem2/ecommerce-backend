import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

const port = process.env.PORT ?? 3333;
const prefix = `/api/v1`;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // ✅ Enable cookie parsing for incoming requests
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.setGlobalPrefix(prefix);
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:3001'], // ✅ only allow your domain
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  });
  await app.listen(port, () => {
    console.log(`✅ Server running on: http://localhost:${port}${prefix}`);
  });
}
void bootstrap();
