import { IsDate, IsNumber, IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity({ name: 'uploaded_object' })
export class UploadedObject extends CoreEntity {
  @IsString()
  @PrimaryColumn({ type: 'varchar', length: 255 })
  ETag: string;

  @IsString()
  @Column({ type: 'varchar', length: 255 })
  Key: string;

  @IsString()
  @Column({ type: 'varchar' })
  url: string;

  @IsDate()
  @UpdateDateColumn({ type: 'timestamptz' }) // defaultType : withoutTZ(offset을 무시하겠다.)
  updateAt: Date;

  @IsDate()
  @CreateDateColumn({ type: 'timestamptz' })
  createAt: Date;

  @IsDate()
  @DeleteDateColumn({ type: 'timestamptz' })
  deleteAt: Date;

  @IsNumber()
  @VersionColumn()
  v: number;
}
