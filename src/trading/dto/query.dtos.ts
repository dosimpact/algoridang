import { IsNumber } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { BaseTradingStrategy } from '../entities';

export class getBaseTradingStrategyInput {
  @IsNumber()
  trading_strategy_code: number;
}
export class getBaseTradingStrategyOutput extends CoreOutput {
  baseTradingStrategy?: BaseTradingStrategy;
}

export class getBaseTradingStrategyListInput {}
export class getBaseTradingStrategyListOutput extends CoreOutput {
  baseTradingStrategyList?: BaseTradingStrategy[];
}
