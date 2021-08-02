import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from 'src/auth/auth.decorator';
import { UploadService } from './upload.service';

@Controller('/api/upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}
  // (1) common 폴더 업로드
  @Roles(['Any'])
  @Post('')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.uploadService.uploadS3(file);
  }
  // (2) icon 폴더 업로드
  @Roles(['Any'])
  @Post('banner')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFileBanner(@UploadedFile() file: Express.Multer.File) {
    return this.uploadService.uploadS3Banner(file);
  }
  // (3) 배너 폴더 업로드
  @Roles(['Any'])
  @Post('icon')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFileIcon(@UploadedFile() file: Express.Multer.File) {
    return this.uploadService.uploadS3Icon(file);
  }
}
