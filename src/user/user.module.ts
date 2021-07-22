import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from 'src/auth/jwt.module';
import { USER } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  controllers: [UserController],
  providers: [
    {
      provide: UserService.name,
      useClass: UserService,
    },
  ],
  exports: [UserService],
})
export class UserModule {}
