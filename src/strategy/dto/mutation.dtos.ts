import { PartialType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { MemberStrategy } from '../entities';
import { InvestType } from '../entities/member-strategy.entity';

// (POST) createMyStrategy	(1) 전략 만들기
export class CreateMyStrategyInput {
  email_id: string; // 사용자 아이디

  tags?: string[]; //해쉬 태그들

  strategy_name: string;
  invest_type: InvestType;
  strategy_explanation: string;
  operation_yes_no: boolean; // 전략 탐색
  alarm_setting: boolean;
  open_yes_no: boolean;
  image_url: string;

  investProfitInfo: {
    invest_principal?: number; // 투자 원금
    securities_corp_fee?: number;
    invest_start_date: Date;
    invest_end_date?: Date;
  };
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
export class NoticeMyStrategyByIdInput {
  email_id: string;
  strategy_code: number;
}
export class NoticeMyStrategyByIdOutput extends CoreOutput {}

// (POST) copyStrategy	id		(6) 투자 전략 복사  ( API )
export class CopyStrategyInput {
  email_id: string;
  strategy_code: number;
}
export class CopyStrategyOutput extends CoreOutput {
  memberStrategy?: MemberStrategy;
}
// (POST) addLookupStrategy	id		(7) 투자 전략 조회자 추가 ( API )
export class AddLookupStrategyInput {
  email_id: string;
  strategy_code: number;
}
export class AddLookupStrategyOutput extends CoreOutput {}
