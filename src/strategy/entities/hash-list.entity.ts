import { IsNumber, IsString } from 'class-validator';
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Hash } from './hash.entity';
import { MemberStrategy } from './member-strategy.entity';

// NM : 전략 - 해쉬 매핑 테이블
@Entity({ name: 'hash_list' })
export class HashList {
  @IsString()
  @PrimaryColumn()
  strategy_code: string;

  @ManyToOne(() => MemberStrategy, (ms) => ms.hashList, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'strategy_code' })
  strategy: MemberStrategy;

  @IsNumber()
  @PrimaryColumn()
  hash_code: number;

  @ManyToOne(() => Hash, (hash) => hash.strategyList, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'hash_code' })
  hash: Hash;
}
