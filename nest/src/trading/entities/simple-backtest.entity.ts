import { IsNumber } from 'class-validator';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { Universal } from './universal';

// 심플 백테스트 테이블
@Entity({ name: 'simple-backtest' })
export class SimpleBacktest {
  // 유니버셜과 1:1 관계 + FK,PK
  @PrimaryColumn()
  universal_code: number;

  @OneToOne(() => Universal, (univ) => univ.simpleBacktest, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'universal_code' })
  universal: Universal;

  @IsNumber()
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  MDD: number;

  @IsNumber()
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  CAGR: number;
}
