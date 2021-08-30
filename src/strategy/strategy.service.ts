import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import {
  GetMyStrategyByIdInput,
  GetMyStrategyByIdOutput,
  GetMyStrategyListInput,
  GetMyStrategyListOutput,
  GetStrategyByIdInput,
  GetStrategyByIdOutput,
  GetStrategyListHighProfitInput,
  GetStrategyListHighProfitOutput,
  GetStrategyListHighViewInput,
  GetStrategyListHighViewOutput,
  GetStrategyListInvestTypeInput,
  GetStrategyListInvestTypeOutput,
  GetStrategyListNewInput,
  GetStrategyListNewOutput,
  GetStrategyListTypeInput,
  GetStrategyListTypeOutput,
} from './dto/query.dtos';
import {
  CopyStrategyInput,
  CopyStrategyOutput,
  CreateMyStrategyInput,
  CreateMyStrategyOutput,
  DeleteMyStrategyByIdInput,
  DeleteMyStrategyByIdOutput,
  NoticeMyStrategyByIdInput,
  NoticeMyStrategyByIdOutput,
  RecoverStrategyByIdInput,
  RecoverStrategyByIdOutput,
  UpdateMyStrategyByIdInput,
  UpdateMyStrategyByIdOutput,
} from './dto/mutation.dtos';
import { Hash, HashList, MemberStrategy } from './entities';
import { InvestType } from './entities/member-strategy.entity';
import { Logger } from '@nestjs/common';
import { InvestProfitInfo } from 'src/backtest/entities';
import { StrategyHashService } from './strategy-hash.service';
import { BacktestService } from 'src/backtest/backtest.service';
// todo : 맴버필드 -> 소문자

@Injectable()
export class StrategyService {
  private readonly logger = new Logger(StrategyService.name);
  private readonly strategyListRelation = [
    'hashList',
    'hashList.hash',
    'investProfitInfo',
    'backtestDetailInfo',
    'operationMemberList',
  ];
  constructor(
    @InjectRepository(Hash)
    private readonly HashRepo: Repository<Hash>,
    @InjectRepository(HashList)
    private readonly HashListRepo: Repository<HashList>,
    @InjectRepository(MemberStrategy)
    private readonly MemberStrategyRepo: Repository<MemberStrategy>,
    // @InjectRepository(StockList)
    // private readonly StockListRepo: Repository<StockList>,
    @InjectRepository(InvestProfitInfo)
    private readonly investProfitInfoRepo: Repository<InvestProfitInfo>,
    private readonly HashService: StrategyHashService,
    private readonly backtestService: BacktestService,
  ) {
    (async () => {})();
  }

  // 1. query
  // (GET) getStrategyListNew	(1) 신규 투자 전략 API
  async getStrategyListNew({
    skip,
    take,
  }: GetStrategyListNewInput): Promise<GetStrategyListNewOutput> {
    skip = skip || 0;
    take = skip || 7;
    const [memberStrategyList, totalResult] =
      await this.MemberStrategyRepo.findAndCount({
        order: {
          create_date: 'DESC',
        },
        relations: this.strategyListRelation,
        skip,
        take,
      });
    return {
      ok: true,
      memberStrategyList,
      totalResult,
      totalPage: Math.ceil(totalResult / take),
    };
  }
  // (GET) getStrategyListHighView (2) 조회수 높은 투자 전략 API
  async getStrategyListHighView({
    skip = 0,
    take = 7,
  }: GetStrategyListHighViewInput): Promise<GetStrategyListHighViewOutput> {
    skip = skip || 0;
    take = skip || 7;
    let [memberStrategyList, totalResult] =
      await this.MemberStrategyRepo.findAndCount({
        order: {
          create_date: 'DESC',
        },
        relations: this.strategyListRelation,
        // join: { innerJoin: ['operationMemberList'] },
      });
    memberStrategyList.sort(
      (a, b) => b.operationMemberList.length - a.operationMemberList.length,
    );
    memberStrategyList = memberStrategyList.slice(skip, skip + take);
    return {
      ok: true,
      memberStrategyList,
      totalResult,
      totalPage: Math.ceil(totalResult / take),
    };
  }
  /*
      SELECT 
      A.strategy_code,
      count(B)
    FROM member_strategy as A
    left join lookup_member_list as B 
    on 
      A.strategy_code =
      B.strategy_code
    group by A.strategy_code
    ;
  */
  //
  async getStrategyListHighProfit({}: GetStrategyListHighProfitInput): Promise<GetStrategyListHighProfitOutput> {
    // 높은 수익률의 전략 코드 리스트를 가져옴
    const strategyCodes =
      await this.backtestService.getHighProfitRateStrategyCodes();
    // console.log('strategyCodes', strategyCodes);

    // 가져온 전략코드들로 Join테이블 생성
    const memberStrategyList = await this.MemberStrategyRepo.createQueryBuilder(
      'member_strategy',
    )
      .whereInIds(strategyCodes)
      .leftJoinAndSelect('member_strategy.hashList', 'hashList')
      .leftJoinAndSelect('hashList.hash', 'hash')
      .leftJoinAndSelect('member_strategy.investProfitInfo', 'investProfitInfo')
      .leftJoinAndSelect(
        'member_strategy.backtestDetailInfo',
        'backtestDetailInfo',
      )
      .leftJoinAndSelect(
        'member_strategy.operationMemberList',
        'operationMemberList',
      )
      .orderBy({
        'member_strategy.create_date': 'DESC',
      })
      .getMany();
    return {
      ok: true,
      memberStrategyList,
      totalPage: Math.ceil(memberStrategyList.length / 20),
      totalResult: memberStrategyList.length,
    };
  }
  // (GET) getStrategyListType(3) 위험추구/중립형/수익안정형 API
  async getStrategyListAllType(
    getStrategyListType: GetStrategyListTypeInput,
  ): Promise<GetStrategyListTypeOutput> {
    const [Unclassified, StableIncome, Neutral, RiskTaking] = await Promise.all(
      Object.keys(InvestType).map(async (type) => {
        const memberStrategyList = await this.MemberStrategyRepo.find({
          order: {
            create_date: 'DESC',
          },
          where: {
            invest_type: InvestType[type],
          },
          relations: this.strategyListRelation,
        });
        // console.log(JSON.stringify(memberStrategyList, null, 4));
        return memberStrategyList;
      }),
    );

    return {
      ok: true,
      memberStrategyRecordList: {
        Unclassified,
        StableIncome,
        Neutral,
        RiskTaking,
      },
    };
  }

  async getStrategyListInvestType({
    investType,
    skip,
    take,
  }: GetStrategyListInvestTypeInput): Promise<GetStrategyListInvestTypeOutput> {
    const memberStrategyList = await this.MemberStrategyRepo.find({
      order: {
        create_date: 'DESC',
      },
      where: {
        invest_type: investType,
      },
      relations: this.strategyListRelation,
    });
    return {
      ok: true,
      memberStrategyList,
    };
  }

  // (GET) getStrategyById	(4)특정 Id로 전략 조회
  // 공개전략만 조회 가능
  async getStrategyById({
    strategy_code,
  }: GetStrategyByIdInput): Promise<GetStrategyByIdOutput> {
    const memberStrategy = await this.MemberStrategyRepo.findOneOrFail({
      where: {
        strategy_code,
        open_yes_no: true,
      },
      relations: [
        'hashList', // 기본 ----
        'hashList.hash',
        'investProfitInfo',
        'backtestDetailInfo',
        'operationMemberList',
        'universal',
        'queueList',
        'histories', // 디테일 -- eager
        // 'backtestWinRatio',  // lazy --
        // 'backtestMontlyProfitRateChart',
        // 'accumulateProfitRateChart',     // 일일 누적 - join 없이
        // 'backtestDailyProfitRateChart', // 일일 수익실현 - join 없이
      ],
    });
    return {
      ok: true,
      memberStrategy,
    };
  }
  // (GET) getMyStrategyList(5) 나의 전략 조회(리스트)
  async getMyStrategyList({
    email_id,
    skip = 0,
    take = 20,
  }: GetMyStrategyListInput): Promise<GetMyStrategyListOutput> {
    const [memberStrategyList, totalResult] =
      await this.MemberStrategyRepo.findAndCount({
        where: {
          operator_id: email_id,
        },
        skip,
        take,
        relations: [
          'hashList',
          'hashList.hash',
          'investProfitInfo',
          'backtestDetailInfo',
          'operationMemberList',
          'universal',
        ],
        order: {
          create_date: 'DESC',
        },
      });
    return {
      ok: true,
      memberStrategyList,
      totalResult,
      totalPage: Math.ceil(totalResult / take),
    };
  }
  // (GET) getMyStrategyById(6) 나의 전략 조회
  // 비공개 전략이더라도, 나는 볼 수 있다.
  async getMyStrategyById({
    email_id,
    strategy_code,
  }: GetMyStrategyByIdInput): Promise<GetMyStrategyByIdOutput> {
    const memberStrategy = await this.MemberStrategyRepo.findOneOrFail({
      where: {
        operator_id: email_id,
        strategy_code,
      },
      relations: [
        'hashList', // 기본 ----
        'hashList.hash',
        'investProfitInfo',
        'backtestDetailInfo',
        'operationMemberList',
        'universal',
        'queueList',
        'histories', // 디테일 -- eager
        // 'backtestWinRatio',  // lazy --
        // 'backtestMontlyProfitRateChart',
        // 'accumulateProfitRateChart',     // 일일 누적 - join 없이
        // 'backtestDailyProfitRateChart', // 일일 수익실현 - join 없이
      ],
    });
    return {
      ok: true,
      memberStrategy,
    };
  }

  async __checkMyStrategy({
    email_id,
    strategy_code,
  }: GetMyStrategyByIdInput): Promise<GetMyStrategyByIdOutput> {
    const memberStrategy = await this.MemberStrategyRepo.findOneOrFail({
      where: {
        operator_id: email_id,
        strategy_code,
      },
    });
    return {
      ok: true,
      memberStrategy,
    };
  }

  // 2. mutation
  // (POST) createMyStrategy	(1) 전략 만들기
  // todo : addStrategy 이름 변경 (레코드 추가)
  // todo : My라는 용어는 뺴고 , User정도
  async createMyStrategy(
    email_id: string,
    strategy: CreateMyStrategyInput,
  ): Promise<CreateMyStrategyOutput> {
    // todo : 일부만 데이터가 CREATE 상황 에선 ..
    // 트랜젝션 하나로 만들어서, Rollback 할 수 있도록
    // 상용화 코드로 -> 프로시져 -> 원하는 시점에 커밋
    // 아니면, 각각 create 애러시 , 삭제를 하도록
    // (1) 전략 생성 , todo : new,check라는 변수는 다른 이름으로 고려
    const newStrategy = await this.MemberStrategyRepo.save(
      this.MemberStrategyRepo.create({
        ...strategy,
        maker_id: email_id,
        operator_id: email_id,
      }),
    );
    // (2) 투자 수익 정보 생성
    // newInvestInfo -> addedInvestInfo |
    // todo : create , save 라인 나누기 | eg investProfitInfo -> setInvestProfitInfo
    const createdInvestInfo = this.investProfitInfoRepo.create({
      strategy_code: newStrategy.strategy_code,
      ...strategy.investProfitInfo,
    });
    const newInvestInfo = await this.investProfitInfoRepo.save(
      createdInvestInfo,
    );
    // 이런식의 의존성 주입은 - 동사로 ( 메소드, 생성자 )
    // 불변성 원칙 ,,, setmethod 불변성 원칙 깨진다.
    // 새로운 변수를 만들어서 다른 변수로 만들어라
    newStrategy.investProfitInfo = newInvestInfo;
    // (3) 해쉬 태그 리스트 생성
    // todo : upsert 라는 용어 -> put
    // todo : __ 언더바 두개, | export 가 public 표현 |
    const tagIdList = await this.HashService.__upsertHashTags(strategy?.tags);
    // 해쉬 태그 매핑 테이블 생성
    await this.HashService.__upsertHashList(
      tagIdList,
      newStrategy.strategy_code,
    );
    // (4) 전략 얻어보기
    const res = await this.getMyStrategyById({
      email_id,
      strategy_code: newStrategy.strategy_code,
    });
    if (!res.ok) throw new Error('cannot find getMyStrategyById');

    return {
      ok: true,
      memberStrategy: res?.memberStrategy,
    };
  }
  // (POST) updateMyStrategyById		(2) 나의 전략 업데이트
  async updateMyStrategyById(
    updateMyStrategyByIdInput: UpdateMyStrategyByIdInput,
  ): Promise<UpdateMyStrategyByIdOutput> {
    // (1) 전략 업데이트
    // (2) 투자 수익 정보 업데이트
    return { ok: false };
  }
  // (POST) deleteMyStrategyById	 	(3) 나의 전략 softdelete
  async deleteMyStrategyById(
    deleteMyStrategyByIdInput: DeleteMyStrategyByIdInput,
  ): Promise<DeleteMyStrategyByIdOutput> {
    // 전략 soft delete
    // 투자 수익 soft delete

    return { ok: false };
  }
  // (POST) recoverStrategyById		(4) (관리자) 나의 전략 recover
  async recoverStrategyById(
    recoverStrategyByIdInput: RecoverStrategyByIdInput,
  ): Promise<RecoverStrategyByIdOutput> {
    // 전략 검색 withDelete
    // 전략 복구

    return { ok: false };
  }
  // (POST) noticeMyStrategyById		(5) 나의 전략 알림기능
  async noticeMyStrategyById(
    noticeMyStrategyByIdInput: NoticeMyStrategyByIdInput,
  ): Promise<NoticeMyStrategyByIdOutput> {
    // 전략 알림 기능 on/off
    return { ok: false };
  }
  // (POST) copyStrategy	id		(6) 투자 전략 복사  ( API )
  async copyStrategy(
    copyStrategyOutput: CopyStrategyInput,
  ): Promise<CopyStrategyOutput> {
    // 사용자 투자 전략 그대로 복제
    // 하드 카피할 테이블 리스트
    // 재설정 : 운용자 아이디, 무조건 비공개,
    // 셋팅이 완료되면, 큐 요청을 flask에 한다.
    // todo (큐 관련 모듈 제작 필요 )

    return { ok: false };
  }
  async addLookupStrategy() {}
}
