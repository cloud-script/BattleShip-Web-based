import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Current cors --> localhost:8080
  app.enableCors({ origin: '*', methods: 'GET, POST' });
  await app.listen(13124);
}
bootstrap();
