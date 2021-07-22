import { IsNumber, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'hash' })
export class Hash {
  @IsNumber()
  @PrimaryGeneratedColumn()
  hash_code: number;

  @IsString()
  @Column({ type: 'varchar', length: 15 })
  hash_contents: string;
}
