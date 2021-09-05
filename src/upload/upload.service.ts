import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import * as AWS from 'aws-sdk';
import { EntityNotFoundError, Repository } from 'typeorm';
import { GetUploadedObjectsOutput } from './dto/query.dtos';
import { UploadedObject } from './entities/uploaded-object.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UploadService {
  private readonly S3: AWS.S3;
  private readonly region: string;
  private readonly buketName: string;
  private readonly ACL: string;
  private readonly logger = new Logger(UploadService.name);

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(UploadedObject)
    private readonly uploadedObjectRepo: Repository<UploadedObject>,
  ) {
    // (1) Region + Key 설정
    AWS.config.update({
      credentials: {
        accessKeyId: configService.get('AWS_S3_ACCESS_KEY'),
        secretAccessKey: configService.get('AWS_S3_SECRET_ACCESS_KEY'),
      },
      region: configService.get('AWS_CONFIG_REGION'),
    });
    // (2) S3객체,엑세스레밸 , 버킷이름+지역
    this.S3 = new AWS.S3();
    this.buketName = configService.get('AWS_S3_BUCKET_NAME');
    this.region = configService.get('AWS_CONFIG_REGION');
    this.ACL = 'public-read';
  }

  // 버킷 생성
  async __createBucket() {
    return await this.S3.createBucket({
      Bucket: this.buketName,
    }).promise();
  }
  // img src 생성
  __makePublicUrl(dest) {
    return `https://${this.buketName}.s3.${this.region}.amazonaws.com/${dest}`;
  }
  // (1) (common) 폴더 업로드
  async uploadS3(file: Express.Multer.File, folder?: string) {
    if (!file) {
      throw new Error('flie neeeds ( key - file, value - image file  )');
    }
    const Key = `${Date.now()}${file.originalname.replace(/\s/g, '')}`;
    folder = folder ? folder : 'common';
    // console.log(`${this.buketName}/${folder}`);
    const result = await this.S3.putObject({
      Bucket: `${this.buketName}/${folder}`,
      ACL: this.ACL,
      Key,
      Body: file.buffer,
    }).promise();

    const uploaded = await this.uploadedObjectRepo.save(
      this.uploadedObjectRepo.create({
        ETag: result.ETag,
        Key,
        url: this.__makePublicUrl(`${folder}/${Key}`),
      }),
    );

    return {
      ok: true,
      ...uploaded,
    };
  }

  // originalname
  async uploadS3TickerS3(file: Express.Multer.File, folder?: string) {
    if (!file) {
      throw new Error('flie neeeds ( key - file, value - image file  )');
    }

    let Key = `${file.originalname.replace(/\s/g, '')}`;
    folder = folder ? folder : 'common';
    // console.log(`${this.buketName}/${folder}`);
    const result = await this.S3.putObject({
      Bucket: `${this.buketName}/${folder}`,
      ACL: this.ACL,
      Key,
      Body: file.buffer,
    }).promise();

    const uploaded = await this.uploadedObjectRepo.save(
      this.uploadedObjectRepo.create({
        ETag: result.ETag,
        Key,
        url: this.__makePublicUrl(`${folder}/${Key}`),
      }),
    );
    return {
      ok: true,
      ...uploaded,
    };
  }
  // (2) icon 폴더 업로드
  async uploadS3Icon(file: Express.Multer.File) {
    const folder = 'icon';
    return this.uploadS3(file, folder);
  }
  // (3) 배너 폴더 업로드
  async uploadS3Banner(file: Express.Multer.File) {
    const folder = 'banner';
    return this.uploadS3(file, folder);
  }

  // (1) 오브젝트 삭제
  async deleteS3(Key: string) {
    await this.S3.deleteObject({
      Bucket: this.buketName,
      Key,
    }).promise();
    return { ok: true };
  }
  // (2) 아이콘 삭제
  async deleteS3Icon(Key: string) {
    return this.deleteS3(`icon/${Key}`);
  }
  // (3) 배너 삭제
  async deleteS3Banner(Key: string) {
    return this.deleteS3(`banner/${Key}`);
  }

  // (1) 업로드된 object들 반환
  async getUploadedObjects(): Promise<GetUploadedObjectsOutput> {
    const uploadedObjects = await this.uploadedObjectRepo.find({});
    return {
      uploadedObjects,
      ok: true,
    };
  }
}

//https://algoridang.s3.ap-northeast-2.amazonaws.com/1627105957873page_fault.gif
//https://algoridang.s3/.ap-northeast-2.amazonaws.com/1627105957873page_fault.gif
