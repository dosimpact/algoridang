import { IsDate, IsNumber, IsString } from 'class-validator';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';
import { Corporation } from './corporation.entity';

@Entity({ name: 'Category-list' })
export class CategoryList {
  @RelationId()
  ticker: number;

  corporation: Corporation;

  @RelationId()
  category_code;

  @IsDate()
  @UpdateDateColumn({ type: 'timestamptz' })
  change_date: Date;
}
