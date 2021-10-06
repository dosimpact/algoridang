import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './common/interceptor/LogginInterceptor';

import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';

Sentry.init({
  dsn: 'https://aa27bb1cf4bd48adb16f3c01dfaf422a@o986270.ingest.sentry.io/5942895',
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

const transaction = Sentry.startTransaction({
  op: 'test',
  name: 'My First Test Transaction',
});

setTimeout(() => {
  try {
    throw new Error('hello my Error~~');
  } catch (e) {
    Sentry.captureException(e);
  } finally {
    transaction.finish();
  }
}, 99);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.enableCors({ origin: '*' });
  app.useGlobalInterceptors(new LoggingInterceptor());
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
