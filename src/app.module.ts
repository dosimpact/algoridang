import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import * as Joi from 'joi';
import { join } from 'path';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { STOCK } from './finance/entities/stock.entity';
import { DAILY_STOCK } from './finance/entities/daliy-stock.entity';
import { STOCK_CATEGORY_LIST } from './finance/entities/stock-category-list';
import { STOCK_CATEGORY } from './finance/entities/stock-category';
import { FinanceModule } from './finance/finance.module';
import { JwtModule } from './auth/jwt.module';
import { AppResolver } from './app.resolver';
import { USER } from './user/entities/user.entity';
import { UserModule } from './user/user.module';
import { JwtMiddleWare } from './auth/jwt.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test',
      ignoreEnvFile: process.env.NODE_ENV === 'prod',
      validationSchema: Joi.object({
        MAINTAINER: Joi.string().required(),
        PORT: Joi.number().required(),
        DATABASE_URL: Joi.string().required(),
        DATABASE_rejectUnauthorized: Joi.string().required(),
      }),
    }),
    GraphQLModule.forRoot({
      introspection: true,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      ...(process.env.DATABASE_rejectUnauthorized === 'false' && {
        ssl: {
          rejectUnauthorized: false,
        },
      }),
      synchronize: true,
      logging: false,
      entities: [STOCK, DAILY_STOCK, STOCK_CATEGORY_LIST, STOCK_CATEGORY, USER],
    }),
    JwtModule.forRoot({ privateKey: process.env.JWT_SECRET_KEY }),
    FinanceModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppResolver],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleWare).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
