import { IsString } from 'class-validator';
import { MemberStrategy } from 'src/strategy/entities';
import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';

@Entity({ name: 'backtest_queue' })
export class BacktestQueue {
  @IsString()
  @PrimaryColumn({ type: 'varchar', length: 255 })
  queue_code: string;

  @IsString()
  @Column({ type: 'varchar', length: 15 })
  state_info: string;

  @OneToOne(() => MemberStrategy, (ms) => ms.queue, { onDelete: 'SET NULL' })
  strategy: MemberStrategy;
}
