import { IsNumber, IsString } from 'class-validator';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class STOCK_CATEGORY {
  @PrimaryGeneratedColumn()
  @IsNumber()
  CATEGORY_CODE: number;

  @IsString()
  @Column()
  CATEGORY_NAME: string;

  @UpdateDateColumn({ type: 'timestamptz' }) // auto updated column
  CHANGE_DATE: Date;
}
