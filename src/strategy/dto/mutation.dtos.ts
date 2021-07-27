import { PartialType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { MemberStrategy } from '../entities';
import { InvestType } from '../entities/member-strategy.entity';

// (POST) createMyStrategy	(1) 전략 만들기
export class CreateMyStrategyInput {
  email_id: string;

  strategy_name: string;
  invest_type: InvestType;
  strategy_explanation: string;
  operation_yes_no: boolean; // 전략 탐색
  alarm_setting: boolean;
  open_yes_no: boolean;
  image_url: string;
}
export class CreateMyStrategyOutput extends CoreOutput {
  memberStrategy?: MemberStrategy;
}
// (POST) updateMyStrategyById		(2) 나의 전략 업데이트
export class UpdateMyStrategyByIdInput extends PartialType(
  CreateMyStrategyInput,
) {
  email_id: string;
}
export class UpdateMyStrategyByIdOutput extends CoreOutput {
  memberStrategy?: MemberStrategy;
}

// (POST) deleteMyStrategyById	 	(3) 나의 전략 softdelete
export class DeleteMyStrategyByIdInput {
  email_id: string;
  strategy_code: number;
}
export class DeleteMyStrategyByIdOutput extends CoreOutput {}
// (POST) recoverStrategyById		(4) (관리자) 나의 전략 recover
export class RecoverStrategyByIdInput {
  strategy_code: number;
}
export class RecoverStrategyByIdOutput extends CoreOutput {}

// (POST) noticeMyStrategyById		(5) 나의 전략 알림기능
export class MoticeMyStrategyByIdInput {
  email_id: string;
  strategy_code: number;
}
export class MoticeMyStrategyByIdOutput extends CoreOutput {}

// (POST) copyStrategy	id		(6) 투자 전략 복사  ( API )
export class CopyStrategyInput {
  email_id: string;
  strategy_code: number;
}
export class CopyStrategyOutput extends CoreOutput {
  memberStrategy?: MemberStrategy;
}
