import { IsNumber, IsString } from 'class-validator';
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { STOCK_CATEGORY } from './stock-category';
import { STOCK } from './stock.entity';

@Entity()
export class STOCK_CATEGORY_LIST {
  @IsNumber()
  @PrimaryColumn()
  CATEGORY_CODE: number;

  @ManyToOne(
    () => STOCK_CATEGORY,
    (stock_category) => stock_category.CATEGORY_CODE,
  )
  @JoinColumn({ name: 'CATEGORY_CODE' })
  STOCK_CATEGORY: STOCK_CATEGORY;

  //---------

  @IsString()
  @PrimaryColumn({ type: 'varchar', length: 10 })
  STOCK_CODE: string;

  @ManyToOne(() => STOCK, (stock) => stock.STOCK_CODE)
  @JoinColumn({ name: 'STOCK_CODE' })
  STOCK: STOCK;
}
