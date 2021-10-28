import { IsNumber, IsEnum } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { StrategyName } from '../constant/strategy-setting';
import { BaseTradingStrategy } from '../entities';

export class GetBaseTradingStrategyInput {
  @IsEnum(StrategyName)
  trading_strategy_name: StrategyName;
}
export class GetBaseTradingStrategyOutput extends CoreOutput {
  baseTradingStrategy?: BaseTradingStrategy;
}

export class GetBaseTradingStrategyListInput {}
export class GetBaseTradingStrategyListOutput extends CoreOutput {
  baseTradingStrategyList?: BaseTradingStrategy[];
}
