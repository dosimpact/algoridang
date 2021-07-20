import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { USER } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([USER])],
  controllers: [],
  exports: [],
  providers: [],
})
export class UserModule {}
