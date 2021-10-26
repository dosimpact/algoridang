import { IsNumber } from 'class-validator';
import { MemberStrategy } from 'src/strategy/entities';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

@Entity({ name: 'backtest_win_ratio' })
export class BacktestWinRatio {
  @PrimaryColumn()
  strategy_code: string;

  @OneToOne(() => MemberStrategy, (ms) => ms.backtestWinRatio, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'strategy_code' })
  strategy: MemberStrategy;

  @IsNumber()
  @Column({ type: 'bigint' })
  win_count: number;

  @IsNumber()
  @Column({ type: 'bigint' })
  loss_count: number;
}
