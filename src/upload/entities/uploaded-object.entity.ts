import { IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'uploaded_object' })
export class UploadedObject extends CoreEntity {
  @IsString()
  @Column({ type: 'varchar', length: 20 })
  ETag: string;

  @IsString()
  @Column({ type: 'varchar', length: 20 })
  Key: string;

  @IsString()
  @Column({ type: 'varchar' })
  url: string;
}
