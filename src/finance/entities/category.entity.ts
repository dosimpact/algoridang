import { IsDate, IsDateString, IsNumber, IsString } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { CategoryList } from './category-list.entity';

@Entity({ name: 'category' })
export class Category {
  @IsNumber()
  @PrimaryColumn()
  category_code: number;

  @IsString()
  @Column({ length: 20 })
  category_name: string;

  @IsDateString()
  @Column({ type: 'timestamptz' })
  change_date: Date;

  @OneToMany(() => CategoryList, (categoryList) => categoryList.category)
  corporationList: CategoryList[];
}
