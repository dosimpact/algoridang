import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { CreateStrategyDto } from './dto/create-strategy.dto';
import { UpdateStrategyDto } from './dto/update-strategy.dto';
import {
  GetMyStrategyByIdInput,
  GetMyStrategyByIdOutput,
  GetMyStrategyListByIdInput,
  GetMyStrategyListByIdOutput,
  GetStrategyByIdInput,
  GetStrategyByIdOutput,
  GetStrategyListHighViewInput,
  GetStrategyListHighViewOutput,
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
  MoticeMyStrategyByIdInput,
  MoticeMyStrategyByIdOutput,
  RecoverStrategyByIdInput,
  RecoverStrategyByIdOutput,
  UpdateMyStrategyByIdInput,
  UpdateMyStrategyByIdOutput,
} from './dto/mutation.dtos';
import { Hash, HashList, MemberStrategy, StockList } from './entities';
import {
  InvestType,
  MemberStrategyRelation,
} from './entities/member-strategy.entity';

@Injectable()
export class StrategyService {
  constructor(
    @InjectRepository(Hash)
    private readonly HashRepo: Repository<Hash>,
    @InjectRepository(HashList)
    private readonly HashListRepo: Repository<HashList>,
    @InjectRepository(MemberStrategy)
    private readonly MemberStrategyRepo: Repository<MemberStrategy>,
    @InjectRepository(StockList)
    private readonly StockListRepo: Repository<StockList>,
  ) {
    const test = async () => {
      Object.keys(InvestType).map(async (type) => {
        console.log(InvestType[type]);

        // const memberStrategyList = await this.MemberStrategyRepo.find({
        //   order: {
        //     create_date: 'DESC',
        //   },
        //   where: {
        //     invest_type: InvestType[type],
        //   },
        //   relations: ['operationMemberList'],
        //   // join: { innerJoin: ['operationMemberList'] },
        // });
        // console.log(JSON.stringify(memberStrategyList, null, 4));
      });

      // const res = await this.MemberStrategyRepo.createQueryBuilder(
      //   'member-strategy',
      // )
      //   .innerJoin('member-strategy.operationMemberList', 'operationMemberList')
      //   .getMany();
      // console.log(res);
    };
    test();
  }

  // 1. query
  // (GET) getStrategyListNew	(1) 신규 투자 전략 API
  async getStrategyListNew(
    getStrategyListNew: GetStrategyListNewInput,
  ): Promise<GetStrategyListNewOutput> {
    try {
      const memberStrategyList = await this.MemberStrategyRepo.find({
        order: {
          create_date: 'DESC',
        },
      });
      return {
        ok: true,
        memberStrategyList,
      };
    } catch (error) {
      return { ok: false };
    }
  }
  // (GET) getStrategyListHighView (2) 조회수 높은 투자 전략 API
  async getStrategyListHighView(
    getStrategyListHighView: GetStrategyListHighViewInput,
  ): Promise<GetStrategyListHighViewOutput> {
    try {
      const memberStrategyList = await this.MemberStrategyRepo.find({
        order: {
          create_date: 'DESC',
        },
        relations: ['operationMemberList'],
        // join: { innerJoin: ['operationMemberList'] },
      });
      memberStrategyList.sort(
        (a, b) => b.operationMemberList.length - a.operationMemberList.length,
      );
      return { ok: true, memberStrategyList };
    } catch (error) {
      return { ok: false };
    }
  }
  // (GET) getStrategyListType(3) 위험추구/중립형/수익안정형 API
  async getStrategyListType(
    getStrategyListType: GetStrategyListTypeInput,
  ): Promise<GetStrategyListTypeOutput> {
    try {
      const [Neutral, RiskTaking, StableIncome, Unclassified] =
        await Promise.all(
          Object.keys(InvestType).map(async (type) => {
            const memberStrategyList = await this.MemberStrategyRepo.find({
              order: {
                create_date: 'DESC',
              },
              where: {
                invest_type: InvestType[type],
              },
              relations: ['operationMemberList'],
              // join: { innerJoin: ['operationMemberList'] },
            });
            console.log(JSON.stringify(memberStrategyList, null, 4));
            return memberStrategyList;
          }),
        );

      return {
        ok: true,
        memberStrategyRecordList: {
          Neutral,
          RiskTaking,
          StableIncome,
          Unclassified,
        },
      };
    } catch (error) {
      return { ok: false, error: 'cannot get getStrategyListType' };
    }
  }
  // (GET) getStrategyById	(4)특정 Id로 전략 조회
  async getStrategyById(
    getStrategyById: GetStrategyByIdInput,
  ): Promise<GetStrategyByIdOutput> {
    try {
    } catch (error) {
      return { ok: false };
    }
  }
  // (GET) getMyStrategyListById(5) 나의 전략 조회(리스트)
  async getMyStrategyListById(
    getMyStrategyListById: GetMyStrategyListByIdInput,
  ): Promise<GetMyStrategyListByIdOutput> {
    return { ok: false };
  }
  // (GET) getMyStrategyById(6) 나의 전략 조회
  async getMyStrategyById(
    getMyStrategyById: GetMyStrategyByIdInput,
  ): Promise<GetMyStrategyByIdOutput> {
    return { ok: false };
  }

  // 2. mutation
  // (POST) createMyStrategy	(1) 전략 만들기
  async createMyStrategy() {}
  // (POST) updateMyStrategyById		(2) 나의 전략 업데이트
  async updateMyStrategyById() {}
  // (POST) deleteMyStrategyById	 	(3) 나의 전략 softdelete
  async deleteMyStrategyById() {}
  // (POST) recoverStrategyById		(4) (관리자) 나의 전략 recover
  async recoverStrategyById() {}
  // (POST) noticeMyStrategyById		(5) 나의 전략 알림기능
  async noticeMyStrategyById() {}
  // (POST) copyStrategy	id		(6) 투자 전략 복사  ( API )
  async copyStrategy() {}
}
