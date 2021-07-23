import { PartialType } from '@nestjs/mapped-types';
import { CreateBacktestDto } from './create-backtest.dto';

export class UpdateBacktestDto extends PartialType(CreateBacktestDto) {}
