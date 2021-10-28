import { CreateInvestProfitInfoInput } from '../../backtest/interface/dtos';
import { CoreOutput } from '../../common/interface/dtos';
import { InvestType, MemberStrategy } from './entities';

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
  strategy_code: string;
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
  strategy_code: string;
}
export interface GetMyStrategyByIdOutput extends CoreOutput {
  memberStrategy?: MemberStrategy;
}

// 전략 검색하기 API
export interface SearchStrategyInput {
  term: string;
}
export interface SearchStrategyOutput extends CoreOutput {
  memberStrategyList?: MemberStrategy[];
}

//mutation

// (POST) createMyStrategy	(1) 전략 만들기
export interface CreateMyStrategyInput {
  strategy_name: string;
  strategy_explanation: string;
  tags?: string[]; //해쉬 태그들

  invest_type?: InvestType; // 투자 유형
  operation_yes_no?: boolean; // 전략 탐색
  open_yes_no?: boolean; // 공개 범위

  investProfitInfo: CreateInvestProfitInfoInput;
  image_url?: string;
  alarm_setting?: boolean;
}

export interface CreateMyStrategyOutput extends CoreOutput {
  memberStrategy?: MemberStrategy;
}

export interface ForkStrategyInput {
  strategy_code: string;
  // 이름, 원금 , 수수료
  strategy_name?: string;
  invest_principal?: string; // 투자 원금
  securities_corp_fee?: string; // 수수료
}
export interface ForkStrategyOutput extends CoreOutput {
  memberStrategy?: MemberStrategy;
}

export interface UpdateMyStrategyByIdInput extends Partial<ForkStrategyInput> {}
export interface UpdateMyStrategyByIdOutput extends CoreOutput {
  memberStrategy?: MemberStrategy;
}

export interface DeleteMyStrategyByIdInput {
  strategy_code: string;
}
export interface DeleteMyStrategyByIdOutput extends CoreOutput {
  memberStrategy?: MemberStrategy;
}
