import { Injectable } from '@nestjs/common';
import { CreateStrategyDto } from './dto/create-strategy.dto';
import { UpdateStrategyDto } from './dto/update-strategy.dto';

@Injectable()
export class StrategyReadService {
  create(createStrategyDto: CreateStrategyDto) {
    return 'This action adds a new strategy';
  }

  findAll() {
    return `This action returns all strategy`;
  }

  findOne(id: number) {
    return `This action returns a #${id} strategy`;
  }

  update(id: number, updateStrategyDto: UpdateStrategyDto) {
    return `This action updates a #${id} strategy`;
  }

  remove(id: number) {
    return `This action removes a #${id} strategy`;
  }
  //   (GET) getStrategyListNew		MemberStrategy [ ] 	(1) 신규 투자 전략 API
  // (GET) getStrategyListHighView		MemberStrategy [ ] 	(2) 조회수 높은 투자 전략 API
  // (GET) getStrategyListType		MemberStrategy [ ] 	(3) 위험추구/중립형/수익안정형 API
  // (GET) getStrategyById		MemberStrategy 	(4) 특정 Id로 전략 조회
  // (GET) getMyStrategyListById	header : token	MemberStrategy [ ] 	(5) 나의 전략 조회(리스트)
  // (GET) getMyStrategyById	header : token	MemberStrategy	(6) 나의 전략 조회
}

@Injectable()
export class StrategyWriteService {
  // (POST) createMyStrategy	Strategy { }
  // header : token	MemberStrategy 	(1) 전략 만들기
  // (POST) updateMyStrategyById	MemberStrategy { 원금, 수수료 }
  // header : token	MemberStrategy 	(2) 나의 전략 업데이트
  // (POST) deleteMyStrategyById	id
  // header : token	MemberStrategy 	(3) 나의 전략 softdelete
  // (POST) recoverStrategyById	id
  // header : token	MemberStrategy 	(4) (관리자) 나의 전략 recover
  // (POST) noticeMyStrategyById	id
  // header : token	MemberStrategy 	(5) 나의 전략 알림기능
  // (POST) copyStrategy	id		(1) 투자 전략 복사  ( API )
}
