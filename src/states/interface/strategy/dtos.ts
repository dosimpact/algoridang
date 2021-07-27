import { CoreOutput } from "../common/entities";
import { InvestType, MemberStrategy } from "./entities";

// (GET) getStrategyListNew	(1) 신규 투자 전략 API
export interface GetStrategyListNewInput {}
export interface GetStrategyListNewOutput extends CoreOutput {
  memberStrategyList?: MemberStrategy[];
}
// (GET) getStrategyListHighView (2) 조회수 높은 투자 전략 API
export interface GetStrategyListHighViewInput {}
export interface GetStrategyListHighViewOutput extends CoreOutput {
  memberStrategyList?: MemberStrategy[];
}

// (GET) getStrategyListType(3) 위험추구/중립형/수익안정형 API
export interface GetStrategyListTypeInput {}
export interface GetStrategyListTypeOutput extends CoreOutput {
  memberStrategyRecordList?: Record<InvestType, MemberStrategy[]>;
}

// (GET) getStrategyById	(4)특정 Id로 전략 조회
export interface GetStrategyByIdInput {
  strategy_code: number;
}
export interface GetStrategyByIdOutput extends CoreOutput {
  memberStrategy?: MemberStrategy;
}

// (GET) getMyStrategyListById(5) 나의 전략 조회(리스트)
export interface GetMyStrategyListInput {
  email_id: string;
}
export interface GetMyStrategyListOutput extends CoreOutput {
  memberStrategyList?: MemberStrategy[];
}
// (GET) getMyStrategyById(6) 나의 전략 조회
export interface GetMyStrategyByIdInput {
  email_id: string;
  strategy_code: number;
}
export interface GetMyStrategyByIdOutput extends CoreOutput {
  memberStrategyList?: MemberStrategy[];
}
