import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
  Version,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from 'src/auth/auth.decorator';
import { UploadService } from './upload.service';

@Controller('/api/upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}
  // (1) common 폴더 업로드
  @Version('1')
  @Roles(['Admin', 'DAServer'])
  @Post('')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.uploadService.uploadS3(file);
  }
  // (2) icon 폴더 업로드
  @Version('1')
  @Roles(['Admin', 'DAServer'])
  @Post('banner')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFileBanner(@UploadedFile() file: Express.Multer.File) {
    return this.uploadService.uploadS3Banner(file);
  }
  // (3) 배너 폴더 업로드
  @Version('1')
  @Roles(['Admin', 'DAServer'])
  @Post('icon')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFileIcon(@UploadedFile() file: Express.Multer.File) {
    return this.uploadService.uploadS3Icon(file);
  }

  // (3) 티커 폴더 업로드
  @Version('1')
  @Roles(['Admin', 'DAServer'])
  @Post('ticker')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFileTicker(@UploadedFile() file: Express.Multer.File) {
    return this.uploadService.uploadS3TickerS3(file, 'ticker');
  }

  @Version('1')
  @Roles(['Admin', 'DAServer'])
  @Get('objects')
  async uploadedObjects() {
    return this.uploadService.getUploadedObjects();
  }
}
