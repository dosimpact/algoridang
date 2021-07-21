import { IsNumber, IsString } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { STOCK } from './stock.entity';

@Entity()
export class Daily_stock {
  @PrimaryColumn({ type: 'timestamptz' })
  stock_date: Date;

  @ManyToOne(() => STOCK, (stock) => stock.STOCK_CODE)
  @JoinColumn({ name: 'STOCK_CODE' })
  STOCK: STOCK;

  @IsString()
  @PrimaryColumn({ type: 'varchar', length: 10 })
  STOCK_CODE: string;

  @IsNumber()
  @Column({ nullable: true })
  OPEN: number;

  @IsNumber()
  @Column({ nullable: true })
  HIGH: number;

  @IsNumber()
  @Column({ nullable: true })
  LOW: number;

  @IsNumber()
  @Column({ nullable: true })
  CLOSE: number;

  @IsNumber()
  @Column({ nullable: true })
  TRADING_VOLUMN: number;
}
