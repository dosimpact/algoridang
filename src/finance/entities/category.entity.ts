import { IsDate, IsNumber, IsString } from 'class-validator';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'Category' })
export class Category {
  @IsNumber()
  @PrimaryGeneratedColumn()
  category_code: number;

  @IsString()
  @Column()
  category_name: string;

  @IsDate()
  @UpdateDateColumn({ type: 'timestamptz' })
  change_date: Date;
}
