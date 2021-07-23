import { IsString } from 'class-validator';
import { MemberStrategy } from 'src/strategy/entities';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity({ name: 'backtest_queue' })
export class BacktestQueue {
  @IsString()
  @PrimaryColumn({ type: 'varchar', length: 255 })
  queue_code: string;

  @IsString()
  @Column({ type: 'varchar', length: 15 })
  state_info: string;

  @IsString()
  @Column({ type: 'varchar', length: 15 })
  word_info: string;

  // (1) 백테스트 큐에 연동된 투자 전략
  @Column()
  strategy_code: number;

  @ManyToOne(() => MemberStrategy, (ms) => ms.queueList, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'strategy_code' })
  strategy: MemberStrategy;
}
