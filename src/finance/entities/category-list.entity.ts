import { IsDate, IsDateString, IsNumber, IsString } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Category } from './category.entity';
import { Corporation } from './corporation.entity';

// 기업과 카테고리의 N:M 매핑 테이블
@Entity({ name: 'category_list' })
export class CategoryList {
  @IsString()
  @PrimaryColumn({ length: 10 })
  ticker: string;

  @ManyToOne(() => Corporation, (corporation) => corporation.categoryList)
  @JoinColumn({ name: 'ticker' })
  corporation: Corporation;

  @IsNumber()
  @PrimaryColumn()
  category_code: number;

  @ManyToOne(() => Category, (category) => category.corporationList)
  @JoinColumn({ name: 'category_code' })
  category: Category;

  @IsDateString()
  @Column()
  change_date: Date;
}
