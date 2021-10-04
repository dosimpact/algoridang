import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadedObject } from './entities/uploaded-object.entity';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';

@Module({
  imports: [TypeOrmModule.forFeature([UploadedObject])],
  providers: [UploadService],
  controllers: [UploadController],
  exports: [],
})
export class UploadModule {}
