import { IsNumber } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { BaseTradingStrategy } from '../entities';

export class GetBaseTradingStrategyInput {
  @IsNumber()
  trading_strategy_code: number;
}
export class GetBaseTradingStrategyOutput extends CoreOutput {
  baseTradingStrategy?: BaseTradingStrategy;
}

export class GetBaseTradingStrategyListInput {}
export class GetBaseTradingStrategyListOutput extends CoreOutput {
  baseTradingStrategyList?: BaseTradingStrategy[];
}
