import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AllExceptionFilter } from 'common/filter/exception.filter';
import { GlobalInterceptor } from 'common/interceptor/global.interceptor';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalInterceptors(new GlobalInterceptor());
  app.useGlobalFilters(new AllExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);
  Logger.log(
    `Listening member server on http://localhost:${PORT}`,
    'startServer',
  );
}
bootstrap();
