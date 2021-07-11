import { IsNumber, IsString } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { STOCK } from './stock.entity';

@Entity()
export class DAILY_STOCK {
  @PrimaryColumn()
  DATE: Date;

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

  @IsNumber()
  @Column({ nullable: true })
  DAY_S_RANGE: number;

  @IsNumber()
  @Column({ nullable: true })
  _3_DAY_MOVING_AVERAGE: number;

  @IsNumber()
  @Column({ nullable: true })
  _5_DAY_MOVING_AVERAGE: number;

  @IsNumber()
  @Column({ nullable: true })
  _10_DAY_MOVING_AVERAGE: number;

  @IsNumber()
  @Column({ nullable: true })
  _20_DAY_MOVING_AVERAGE: number;

  @IsNumber()
  @Column({ nullable: true })
  _60_DAY_MOVING_AVERAGE: number;

  @IsNumber()
  @Column({ nullable: true })
  _3_DAY_TRADING_AVERAGE: number;

  @IsNumber()
  @Column({ nullable: true })
  _5_DAY_TRADING_AVERAGE: number;

  @IsNumber()
  @Column({ nullable: true })
  _10_DAY_TRADING_AVERAGE: number;

  @IsNumber()
  @Column({ nullable: true })
  _20_DAY_TRADING_AVERAGE: number;

  @IsNumber()
  @Column({ nullable: true })
  _60_DAY_TRADING_AVERAGE: number;

  @IsNumber()
  @Column({ nullable: true })
  DATE_ORDER_BY_ITEM: number;

  @IsNumber()
  @Column({ nullable: true })
  TRADING_VALUE: number;
}
