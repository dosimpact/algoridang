import { InputType } from '@nestjs/graphql';
import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateInvestProfitInfoInput } from 'src/backtest/dto/mutation.dtos';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { MemberStrategy } from '../entities';
import { InvestType } from '../entities/member-strategy.entity';

// (POST) createMyStrategy	(1) 전략 만들기
@InputType()
export class CreateMyStrategyInput {
  @IsOptional()
  @IsString({ each: true })
  tags?: string[]; //해쉬 태그들

  @IsString()
  strategy_name: string;

  @IsOptional()
  @IsEnum(InvestType)
  invest_type?: InvestType;

  @IsString()
  strategy_explanation: string;

  @IsOptional()
  @IsBoolean()
  operation_yes_no?: boolean; // 전략 탐색

  @IsOptional()
  @IsBoolean()
  alarm_setting?: boolean;

  @IsOptional()
  @IsBoolean()
  open_yes_no?: boolean;

  @IsOptional()
  @IsString()
  image_url?: string;

  @ValidateNested()
  @Type()
  investProfitInfo: CreateInvestProfitInfoInput;
}

export class CreateMyStrategyOutput extends CoreOutput {
  memberStrategy?: MemberStrategy;
}

export class ForkStrategyInput {
  @IsString()
  strategy_code: string;

  // 이름, 원금 , 수수료
  @IsString()
  @IsOptional()
  strategy_name?: string;

  @IsString()
  @IsOptional()
  invest_principal?: string; // 투자 원금

  @IsString()
  @IsOptional()
  securities_corp_fee?: string; // 수수료
}
export class ForkStrategyOutput extends CoreOutput {
  memberStrategy?: MemberStrategy;
}

// (POST) updateMyStrategyById		(2) 나의 전략 업데이트
export class UpdateMyStrategyByIdInput extends PartialType(ForkStrategyInput) {}
export class UpdateMyStrategyByIdOutput extends CoreOutput {
  memberStrategy?: MemberStrategy;
}

// (POST) deleteMyStrategyById	 	(3) 나의 전략 softdelete
export class DeleteMyStrategyByIdInput {
  @IsString()
  strategy_code: string;
}
export class DeleteMyStrategyByIdOutput extends CoreOutput {
  memberStrategy?: MemberStrategy;
}

// (POST) recoverStrategyById		(4) (관리자) 나의 전략 recover
// export class RecoverStrategyByIdInput {
//   @IsString()
//   strategy_code: string;
// }
// export class RecoverStrategyByIdOutput extends CoreOutput {}

// // (POST) noticeMyStrategyById		(5) 나의 전략 알림기능
// export class NoticeMyStrategyByIdInput {
//   // email_id: string;
//   @IsString()
//   strategy_code: string;
// }
// export class NoticeMyStrategyByIdOutput extends CoreOutput {}

// // (POST) copyStrategy	id		(6) 투자 전략 복사  ( API )
// export class CopyStrategyInput {
//   // email_id: string;
//   @IsString()
//   strategy_code: string;
// }
// export class CopyStrategyOutput extends CoreOutput {
//   memberStrategy?: MemberStrategy;
// }
// // (POST) addLookupStrategy	id		(7) 투자 전략 조회자 추가 ( API )
// export class AddLookupStrategyInput {
//   email_id: string;
//   strategy_code: string;
// }
// export class AddLookupStrategyOutput extends CoreOutput {}
