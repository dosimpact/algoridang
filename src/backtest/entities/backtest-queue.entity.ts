import { IsString } from 'class-validator';
import { MemberStrategy } from 'src/strategy/entities';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

export enum BacktestState {
  New = 'New', // 생성
  Ready = 'Ready', // 진입 & 대기중
  Running = 'Running', // 작업중
  Success = 'Success', // 완료
  Error = 'Error', // 애러
}

@Entity({ name: 'backtest_queue' })
export class BacktestQueue {
  @IsString()
  @PrimaryColumn({ type: 'varchar', length: 255 })
  queue_code: string;

  @IsString()
  @Column({ type: 'enum', enum: BacktestState, default: BacktestState.New })
  state_info: BacktestState;

  @IsString()
  @Column({ type: 'varchar', length: 15 })
  work_info: string;

  // (1) 백테스트 큐에 연동된 투자 전략
  @Column()
  strategy_code: number;

  @ManyToOne(() => MemberStrategy, (ms) => ms.queueList, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'strategy_code' })
  strategy: MemberStrategy;
}
