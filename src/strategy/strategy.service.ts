import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Raw, Repository } from 'typeorm';
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
  SearchStrategyInput,
  SearchStrategyOutput,
} from './dto/query.dtos';
import {
  CopyStrategyInput,
  CopyStrategyOutput,
  CreateMyStrategyInput,
  CreateMyStrategyOutput,
  DeleteMyStrategyByIdInput,
  DeleteMyStrategyByIdOutput,
  ForkStrategyInput,
  ForkStrategyOutput,
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
import { InvestProfitInfo, History } from 'src/backtest/entities';
import { StrategyHashService } from './strategy-hash.service';
import { BacktestService } from 'src/backtest/backtest.service';
import { TradingService } from 'src/trading/trading.service';
import { FlaskService } from 'src/backtest/flask.service';
import { Universal } from 'src/trading/entities';
import { FinanceService } from 'src/finance/finance.service';
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
    'universal',
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

    @Inject(forwardRef(() => TradingService))
    private readonly tradingService: TradingService,
    @Inject(forwardRef(() => FinanceService))
    private readonly financeService: FinanceService,
    @Inject(forwardRef(() => FlaskService))
    private readonly flaskService: FlaskService,
  ) {}

  // 1. query
  // (GET) getStrategyListNew	(1) 신규 투자 전략 API
  async getStrategyListNew({
    skip,
    take,
  }: GetStrategyListNewInput): Promise<GetStrategyListNewOutput> {
    skip = skip || 0;
    take = take || 7;
    const [memberStrategyList, totalResult] =
      await this.MemberStrategyRepo.findAndCount({
        where: {
          open_yes_no: true,
        },
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
    take = take || 7;
    let [memberStrategyList, totalResult] =
      await this.MemberStrategyRepo.findAndCount({
        where: {
          open_yes_no: true,
        },
        order: {
          create_date: 'DESC',
        },
        relations: this.strategyListRelation,
        // join: { innerJoin: ['operationMemberList'] },
        skip,
        take,
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

  // TODO skip,take, 쿼리빌더 적용
  async getStrategyListHighProfit({
    skip,
    take,
  }: GetStrategyListHighProfitInput): Promise<GetStrategyListHighProfitOutput> {
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
      // .leftJoinAndSelect('member_strategy.queueList', 'queueList')
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
            open_yes_no: true,
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
    skip = skip || 0;
    take = take || 7;
    const memberStrategyList = await this.MemberStrategyRepo.find({
      order: {
        create_date: 'DESC',
      },
      where: {
        open_yes_no: true,
        invest_type: investType,
      },
      relations: this.strategyListRelation,
      skip,
      take,
    });
    return {
      ok: true,
      memberStrategyList,
    };
  }
  // strategy_name ILIKE  조회
  async searchStrategyByName({
    term,
    skip,
    take,
  }: SearchStrategyInput): Promise<SearchStrategyOutput> {
    term = term || '삼성';
    skip = skip || 0;
    take = take || 7;
    const memberStrategyList = await this.MemberStrategyRepo.find({
      where: [
        {
          strategy_name: Raw(
            (strategy_name) => `${strategy_name} ILIKE '%${term}%'`,
          ),
        },
      ],
      relations: this.strategyListRelation,
      skip,
      take,
    });
    return { memberStrategyList, ok: true };
  }
  // TickerName 보유한 전략  조회
  async searchStrategyByTickerName({
    term,
    skip,
    take,
  }: SearchStrategyInput): Promise<SearchStrategyOutput> {
    term = term || '삼성';
    skip = skip || 0;
    take = take || 7;
    // step1   corpname > ticker
    const corps = await this.financeService.searchTickerByTerm(term);
    let tickers = corps.map((e) => e.ticker);
    tickers = [...new Set(tickers)];

    // step2  tickers > unversals
    const univList = await Promise.all(
      tickers.map((ticker) => {
        return this.tradingService.searchStrategyCodeByTicker(ticker);
      }),
    );
    const flattenUnivList = univList.reduce((acc, val) => acc.concat(val), []);
    const codes = flattenUnivList.map((e) => e.strategy_code);
    // step3  where in strategy_code
    const memberStrategyList = await this.MemberStrategyRepo.find({
      where: [
        {
          strategy_code: In(codes),
        },
      ],
      relations: this.strategyListRelation,
      skip,
      take,
    });
    return { memberStrategyList, ok: true };
  }
  // (GET) getStrategyById	(4)특정 Id로 전략 조회
  // 공개전략만 조회 가능
  async getStrategyById({
    strategy_code,
  }: GetStrategyByIdInput): Promise<GetStrategyByIdOutput> {
    const memberStrategy = await this.MemberStrategyRepo.createQueryBuilder(
      'member_strategy',
    )
      .where('member_strategy.strategy_code = :strategy_code', {
        strategy_code,
      })
      // .whereInIds(strategy_code)
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
      .leftJoinAndSelect('member_strategy.universal', 'universal')
      .leftJoinAndSelect('member_strategy.histories', 'histories')
      // .leftJoinAndSelect('member_strategy.queueList', 'queueList')
      .orderBy({
        // 'member_strategy.histories.history_date': 'DESC',
        // 'member_strategy.create_date': 'DESC',
      })
      .getOneOrFail();
    //⚠
    if (
      memberStrategy &&
      memberStrategy.histories &&
      memberStrategy.histories.length >= 2
    ) {
      // ✅ TypeORM에서 @Column({ type: 'timestamptz' }) 은 Date로 반환한다.
      // 메모리상에서는 객체이고, API 의 응답값으로는 Date 문자열로 치환되어 나간ㄷ.
      // Typescript: Date.getTime()으로 밀리세컨들르 구해서 정렬
      memberStrategy.histories = this.sortHistoryList(memberStrategy.histories);
      // ✅ (정렬방법2) Date객체가 아니라, 문자열로 "2016-10-26T06:30:00.000Z" 주어진다면
      // let [u, v] = [a.history_date.slice(0, 10), b.history_date.slice(0, 10)];
      // u = u.split('-').reverse().join('');
      // v = v.split('-').reverse().join('');
      // return u > v ? 1 : u < v ? -1 : 0;
    }

    // const memberStrategy = await this.MemberStrategyRepo.findOneOrFail({
    //   where: {
    //     strategy_code,
    //     open_yes_no: true,
    //   },
    //   relations: [
    //     'hashList', // 기본 ----
    //     'hashList.hash',
    //     'investProfitInfo',
    //     'backtestDetailInfo',
    //     'operationMemberList',
    //     'universal',
    //     'histories', // 디테일 -- eager
    //     // 'backtestWinRatio',  // lazy --
    //     // 'backtestMontlyProfitRateChart',
    //     // 'accumulateProfitRateChart',     // 일일 누적 - join 없이
    //     // 'backtestDailyProfitRateChart', // 일일 수익실현 - join 없이
    //   ],
    //   order: {
    //     histories: 'ASC',
    //   },
    // });

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
        relations: this.strategyListRelation,
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
  async getMyStrategyById(
    email_id,
    { strategy_code }: GetMyStrategyByIdInput,
  ): Promise<GetMyStrategyByIdOutput> {
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

    if (
      memberStrategy &&
      memberStrategy.histories &&
      memberStrategy.histories.length >= 2
    ) {
      memberStrategy.histories = this.sortHistoryList(memberStrategy.histories);
    }

    return {
      ok: true,
      memberStrategy,
    };
  }

  sortHistoryList(histories: History[]) {
    histories = histories.sort((a, b) => {
      let [u, v] = [a.history_date, b.history_date];
      return v.getTime() - u.getTime();
    });
    return histories;
  }

  async __checkMyStrategy(
    email_id,
    { strategy_code }: GetMyStrategyByIdInput,
  ): Promise<GetMyStrategyByIdOutput> {
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
    const res = await this.getMyStrategyById(email_id, {
      strategy_code: newStrategy.strategy_code,
    });
    if (!res.ok) throw new Error('cannot find getMyStrategyById');

    return {
      ok: true,
      memberStrategy: res?.memberStrategy,
    };
  }

  async __forkMemberStrategy(
    sourceStrategy: MemberStrategy,
    patchProps: {
      email_id: string;
      strategy_name?: string;
    },
  ) {
    const { email_id, strategy_name } = patchProps;
    // 1 전략 만들기
    const templateStrategy = this.MemberStrategyRepo.create({});

    // 1.1 전략 디폴트 데이터
    templateStrategy.strategy_name = sourceStrategy.strategy_name;
    templateStrategy.create_date = sourceStrategy.create_date;
    templateStrategy.invest_type = sourceStrategy.invest_type;
    templateStrategy.strategy_explanation = sourceStrategy.strategy_explanation;
    templateStrategy.operation_yes_no = sourceStrategy.operation_yes_no;
    templateStrategy.alarm_setting = sourceStrategy.alarm_setting;
    // templateStrategy.deleteAt = sourceStrategy.deleteAt;
    templateStrategy.open_yes_no = sourceStrategy.open_yes_no;
    // templateStrategy.operator_id = sourceStrategy.operator_id;
    templateStrategy.maker_id = sourceStrategy.maker_id;
    templateStrategy.image_url = sourceStrategy.image_url;
    templateStrategy.universal_producer = sourceStrategy.universal_producer;

    // 1.2 전략 forked 데이터
    if (strategy_name) templateStrategy.strategy_name = strategy_name;
    templateStrategy.operator_id = email_id;
    templateStrategy.open_yes_no = false;
    templateStrategy.operation_yes_no = true;
    delete templateStrategy.create_date; // ORM 처리

    const newStrategy = await this.MemberStrategyRepo.save(templateStrategy);
    return newStrategy;
  }

  async __forkInvestProfitInfo(
    sourceStrategy: MemberStrategy,
    pathProps: {
      strategy_code: string;
      invest_principal?: string;
      securities_corp_fee?: string;
    },
  ) {
    const { strategy_code, invest_principal, securities_corp_fee } = pathProps;
    const sourceInvestProfitInfo = sourceStrategy.investProfitInfo;
    const templateInvestProfitInfo = this.investProfitInfoRepo.create({});

    // 2.1 디폴트 값
    templateInvestProfitInfo.invest_principal =
      sourceInvestProfitInfo.invest_principal;
    templateInvestProfitInfo.securities_corp_fee =
      sourceInvestProfitInfo.securities_corp_fee;

    templateInvestProfitInfo.strategy_code = strategy_code;
    templateInvestProfitInfo.invest_start_date = new Date().toISOString();
    if (invest_principal)
      templateInvestProfitInfo.invest_principal = invest_principal;
    if (securities_corp_fee)
      templateInvestProfitInfo.securities_corp_fee = securities_corp_fee;

    const newInvestProfitInfo = await this.investProfitInfoRepo.save(
      templateInvestProfitInfo,
    );
    return newInvestProfitInfo;
  }

  async __forkUniversal(
    sourceUniversals: Universal[],
    patchProps: {
      email_id: string;
      strategy_code: string;
    },
  ) {
    const { email_id, strategy_code } = patchProps;
    return Promise.all(
      sourceUniversals.map(async (univ) => {
        return this.tradingService.addUniversal(email_id, {
          ...univ,
          strategy_code,
        });
      }),
    );
  }
  async __forkTags(
    sourceTags: HashList[],
    patchProps: {
      newStrategy: MemberStrategy;
    },
  ) {
    const { newStrategy } = patchProps;
    return Promise.all(
      sourceTags.map(async (hashList) => {
        return this.HashService.__createHashList(
          hashList.hash_code,
          newStrategy.strategy_code,
        );
      }),
    );
  }

  /**
   * (POST) forkStrategy (2) 전략 복사
   * @param {string} email_id
   * @param {ForkStrategyInput} ForkStrategyInput
   * @returns {Promise<ForkStrategyOutput>} ForkStrategyOutput
   */
  async forkStrategy(
    email_id: string,
    {
      strategy_code,
      invest_principal,
      securities_corp_fee,
      strategy_name,
    }: ForkStrategyInput,
  ): Promise<ForkStrategyOutput> {
    // 0. 해당 전략을 복사한다.
    const sourceStrategy = await this.MemberStrategyRepo.findOneOrFail({
      where: {
        strategy_code,
        // open_yes_no: true,
      },
      relations: [
        'hashList', // 기본 ----
        'hashList.hash',
        'investProfitInfo',
        'universal',
      ],
    });
    // console.log('[0]sourceStrategy', sourceStrategy);
    // 1- refactoring :
    const newStrategy = await this.__forkMemberStrategy(sourceStrategy, {
      email_id,
      strategy_name,
    });
    // console.log('[1] newStrategy', newStrategy);
    // 2. InvestProfitInfo fork
    const newInvestProfitInfo = await this.__forkInvestProfitInfo(
      sourceStrategy,
      {
        strategy_code: newStrategy.strategy_code,
        invest_principal,
        securities_corp_fee,
      },
    );
    // console.log('[2] newInvestProfitInfo', newInvestProfitInfo);
    // 3. Universal fork
    const newUniversals = await this.__forkUniversal(sourceStrategy.universal, {
      email_id,
      strategy_code: newStrategy.strategy_code,
    });
    // console.log('[3] newUniversals', newUniversals);
    // 4. hash fork
    const newTags = await this.__forkTags(sourceStrategy.hashList, {
      newStrategy,
    });
    // console.log('[4] newTags', newTags);
    // 5. final strategy
    const res = await this.getMyStrategyById(email_id, {
      strategy_code: newStrategy.strategy_code,
    });
    if (!res.ok || !res.memberStrategy)
      throw new Error('cannot find getMyStrategyById');
    // console.log('[5] final strategy', res);
    // 3. 백테스팅 요청

    this.flaskService
      .pushBackTestQ(email_id, {
        strategy_code: res.memberStrategy.strategy_code,
      })
      .then((e) => {
        this.logger.verbose(
          `✔ pushBackTestQ ok ${res.memberStrategy.strategy_code}`,
        );
      })
      .catch(() => {
        this.logger.error(
          `✔ pushBackTestQ fail ${res.memberStrategy.strategy_code}`,
        );
      });

    this.logger.verbose(
      `✔ forked memberStrategy ${sourceStrategy.strategy_code} -> ${res.memberStrategy.strategy_code}`,
    );
    return {
      ok: true,
      memberStrategy: res?.memberStrategy,
    };
  }

  // (POST) updateMyStrategyById		(2) 나의 전략 업데이트
  async updateMyStrategyById(
    email_id: string,
    updateMyStrategyByIdInput: UpdateMyStrategyByIdInput,
  ): Promise<UpdateMyStrategyByIdOutput> {
    // 1. 나의 전략인지 확인 및 가져오기
    const sourceStrategy = await this.MemberStrategyRepo.findOneOrFail({
      where: {
        strategy_code: updateMyStrategyByIdInput.strategy_code,
        operator_id: email_id,
        // open_yes_no: true,
      },
      relations: ['investProfitInfo'],
    });
    // 2. 정보 업데이트
    if (updateMyStrategyByIdInput.strategy_name)
      sourceStrategy.strategy_name = updateMyStrategyByIdInput.strategy_name;

    if (updateMyStrategyByIdInput.invest_principal)
      sourceStrategy.investProfitInfo.invest_principal =
        updateMyStrategyByIdInput.invest_principal;

    if (updateMyStrategyByIdInput.securities_corp_fee)
      sourceStrategy.investProfitInfo.securities_corp_fee =
        updateMyStrategyByIdInput.securities_corp_fee;

    // 3. 업데이트 정보  업데이트 후 저장
    await this.MemberStrategyRepo.save(sourceStrategy);
    await this.backtestService.__updateInvestProfitInfo(
      sourceStrategy.investProfitInfo,
    );
    // 4. 백테스트 재요청
    this.flaskService
      .pushBackTestQ(email_id, {
        strategy_code: sourceStrategy.strategy_code,
      })
      .then((e) => {
        this.logger.verbose(
          `✔ pushBackTestQ ok ${sourceStrategy.strategy_code}`,
        );
      })
      .catch(() => {
        this.logger.error(
          `✔ pushBackTestQ fail ${sourceStrategy.strategy_code}`,
        );
      });

    return { ok: true, memberStrategy: sourceStrategy };
  }

  // (POST) deleteMyStrategyById	 	(3) 나의 전략 delete
  async hardDeleteMyStrategyById(
    email_id: string,
    { strategy_code }: DeleteMyStrategyByIdInput,
  ): Promise<DeleteMyStrategyByIdOutput> {
    // 전략 soft delete
    // 투자 수익 soft delete
    const result = await this.getMyStrategyById(email_id, { strategy_code });
    const del_result = await this.MemberStrategyRepo.delete(
      result.memberStrategy,
    );
    if (del_result.affected >= 1) {
      return { ok: true };
    } else {
      throw new NotFoundException(
        `strategy_code : ${strategy_code} delete Fail`,
      );
    }
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
}
