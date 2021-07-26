import { NestFactory } from '@nestjs/core';
import { SeederModule } from './seeder.module';
import { SeederService } from './seeder.service';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(SeederModule);
  const seederService = appContext.get(SeederService);
  // await seederService.seedScenario01();
  await seederService.seedBaseTradingStrategy();
}
bootstrap();
