import { IsDate, IsDateString, IsNumber, IsString } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Corporation } from './corporation.entity';

@Entity({ name: 'daily_stock' })
export class DailyStock {
  @IsDateString()
  @PrimaryColumn({ type: 'timestamptz' })
  stock_date: Date;

  @IsNumber()
  @Column({ type: 'bigint' })
  open_price: number; //OHLCV

  @IsNumber()
  @Column({ type: 'bigint' })
  high_price: number; //OHLCV

  @IsNumber()
  @Column({ type: 'bigint' })
  low_price: number; //OHLCV

  @IsNumber()
  @Column({ type: 'bigint' })
  close_price: number; //OHLCV

  @IsNumber()
  @Column({ type: 'bigint' })
  volume: number; //OHLCV

  // 1:N관계
  // (1)
  @IsString()
  @PrimaryColumn({ type: 'varchar', length: 10 })
  ticker: string;

  @ManyToOne(() => Corporation, (corporation) => corporation.dailyStocks)
  @JoinColumn({ name: 'ticker' })
  corporation: Corporation;
}
