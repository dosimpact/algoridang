import { IsNumber } from 'class-validator';
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Hash } from './hash.entity';
import { MemberStrategy } from './member-strategy.entity';

// NM : 전략 - 해쉬 매핑 테이블
@Entity({ name: 'hash_list' })
export class HashList {
  @IsNumber()
  @PrimaryColumn()
  strategy_code: number;

  @ManyToOne(() => MemberStrategy, (ms) => ms.hashList)
  @JoinColumn({ name: 'strategy_code' })
  strategy: MemberStrategy;

  @IsNumber()
  @PrimaryColumn()
  hash_code: number;

  @ManyToOne(() => Hash, (hash) => hash.strategyList)
  @JoinColumn({ name: 'hash_code' })
  hash: Hash;
}
