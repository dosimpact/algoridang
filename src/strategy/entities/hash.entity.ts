import { IsNumber, IsString } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { HashList } from './hash-list.entity';

@Entity({ name: 'hash' })
export class Hash {
  @IsNumber()
  @PrimaryGeneratedColumn()
  hash_code: number;

  @IsString()
  @Column({ type: 'varchar', length: 15 })
  hash_contents: string;

  @OneToMany(() => HashList, (hashList) => hashList.hash)
  strategyList: HashList[];
}
