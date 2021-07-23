import { PartialType } from '@nestjs/mapped-types';
import { CreateTradingDto } from './create-trading.dto';

export class UpdateTradingDto extends PartialType(CreateTradingDto) {}
