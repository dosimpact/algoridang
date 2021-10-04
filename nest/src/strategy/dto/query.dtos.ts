import { CorePaginationInput } from 'src/common/dtos/input.dto';
import { CoreOutput, CorePaginationOutput } from 'src/common/dtos/output.dto';
import { MemberStrategy } from '../entities';
import { InvestType } from '../entities/member-strategy.entity';

// (GET) getStrategyListNew	(1) 신규 투자 전략 API
export class GetStrategyListNewInput extends CorePaginationInput {}
export class GetStrategyListNewOutput extends CorePaginationOutput {
  memberStrategyList?: MemberStrategy[];
}

export class GetStrategyListHighProfitInput extends CorePaginationInput {}
export class GetStrategyListHighProfitOutput extends CorePaginationOutput {
  memberStrategyList?: MemberStrategy[];
}

// (GET) getStrategyListHighView (2) 조회수 높은 투자 전략 API
export class GetStrategyListHighViewInput extends CorePaginationInput {}
export class GetStrategyListHighViewOutput extends CorePaginationOutput {
  memberStrategyList?: MemberStrategy[];
}

// (GET) getStrategyListType(3) 위험추구/중립형/수익안정형 API
export class GetStrategyListTypeInput extends CorePaginationInput {}
export class GetStrategyListTypeOutput extends CorePaginationOutput {
  memberStrategyRecordList?: Record<InvestType, MemberStrategy[]>;
}

export class GetStrategyListInvestTypeInput extends CorePaginationInput {
  investType: InvestType;
}
export class GetStrategyListInvestTypeOutput extends CorePaginationOutput {
  memberStrategyList?: MemberStrategy[];
}

// (GET) getStrategyById	(4)특정 Id로 전략 조회
export class GetStrategyByIdInput {
  strategy_code: string;
}
export class GetStrategyByIdOutput extends CoreOutput {
  memberStrategy?: MemberStrategy;
}

// (GET) getMyStrategyListById(5) 나의 전략 조회(리스트)
export class GetMyStrategyListInput extends CorePaginationInput {
  email_id: string;
}
export class GetMyStrategyListOutput extends CorePaginationOutput {
  memberStrategyList?: MemberStrategy[];
}
// (GET) getMyStrategyById(6) 나의 전략 조회
export class GetMyStrategyByIdInput {
  strategy_code: string;
}
export class GetMyStrategyByIdOutput extends CoreOutput {
  memberStrategy?: MemberStrategy;
}

// (GET) getStrategyByTerm	(4)검색어로 전략 조회
export class SearchStrategyByNameInput {
  term: string;
}
export class SearchStrategyByNameOutput extends CoreOutput {
  memberStrategyList?: MemberStrategy[];
}

export class SearchStrategyInput extends CorePaginationInput {
  term: string;
}
export class SearchStrategyOutput extends CoreOutput {
  memberStrategyList?: MemberStrategy[];
}
