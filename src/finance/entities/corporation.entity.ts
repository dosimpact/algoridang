import { IsString } from 'class-validator';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'Corporation' })
export class Corporation {
  @IsString()
  @PrimaryColumn()
  ticker: string;

  @IsString()
  @Column()
  corp_name: string;
}
