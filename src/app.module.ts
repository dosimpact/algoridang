import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import * as Joi from 'joi';
import { join } from 'path';
import { AppController } from './app.controller';
import { CounterModule } from './p01/counter/counter.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Counter } from './p01/counter/entities/counter.entity';
import { Todo } from './p01/todo/entities/todo.entity';
import { TodoModule } from './p01/todo/todo.module';
import { STOCK } from './finance/entities/stock.entity';
import { DAILY_STOCK } from './finance/entities/daliy-stock.entity';
import { STOCK_CATEGORY_LIST } from './finance/entities/stock-category-list';
import { STOCK_CATEGORY } from './finance/entities/stock-category';
import { User } from './test-user/entities/user.entity';
import { Note } from './test-user/entities/note.entity';
import { UserModule } from './test-user/user.module';
import { FinanceModule } from './finance/finance.module';

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
      entities: [
        Counter,
        Todo,
        STOCK,
        DAILY_STOCK,
        STOCK_CATEGORY_LIST,
        STOCK_CATEGORY,
        User,
        Note,
      ],
    }),
    CounterModule,
    TodoModule,
    UserModule,
    FinanceModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
