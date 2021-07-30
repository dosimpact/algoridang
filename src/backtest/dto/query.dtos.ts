import { IsNumber } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { History } from '../entities';

// 전략에 대한 히스토리 획득
export class GetHistoryListInput {
  @IsNumber()
  strategy_code: number;
}
export class GetHistoryListOutput extends CoreOutput {
  historyList?: History[];
}
