import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Current cors --> localhost:8080
  app.enableCors({ origin: 'http://localhost:8080', methods: '*' });
  await app.listen(13124);
}
bootstrap();
