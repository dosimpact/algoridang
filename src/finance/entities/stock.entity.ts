import { IsNumber, IsString } from 'class-validator';
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class STOCK {
  @IsString()
  @PrimaryColumn({ type: 'varchar', length: 10 })
  STOCK_CODE: string;

  @IsString()
  @Column()
  STOCK_NAME: string;
}
