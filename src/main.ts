import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import Decimal from 'decimal.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe(
    { transform: true, 
      transformOptions: { 
        enableImplicitConversion: true 
      }, 
      validationError: { 
        target: true 
      },
      
    }
    ))

  app.enableCors({
    origin(url, callback) {
      callback(null, true)
    }   
  })
  await app.listen(6800);
}
bootstrap();
