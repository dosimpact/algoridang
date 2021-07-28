import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from 'src/auth/jwt.service';
import { StrategyService } from 'src/strategy/strategy.service';
import { Repository } from 'typeorm';
import {
  getLookupMemberListInput,
  getLookupMemberListOutput,
  GetMemberInfoInput,
  GetMemberInfoOutput,
  LoginMemberInfoInput,
  LoginMemberInfoOutput,
} from './dtos/query.dtos';
import { LookupMemberList, MemberInfo, OperationMemberList } from './entities';

@Injectable()
export class MemberService {
  private readonly logger = new Logger(MemberService.name);
  constructor(
    @InjectRepository(MemberInfo)
    private readonly memberInfoRepo: Repository<MemberInfo>,
    @InjectRepository(LookupMemberList)
    private readonly lookupMemberListRepo: Repository<LookupMemberList>,
    @InjectRepository(OperationMemberList)
    private readonly operationMemberListRepo: Repository<OperationMemberList>,
    private readonly jwtService: JwtService,
    private readonly strategyService: StrategyService,
  ) {
    const test = async () => {
      await this.memberInfoRepo.save(
        this.memberInfoRepo.create({
          email_id: 'ypd03008@gmail.com',
          password: 'ypd03008',
          member_name: '익명의 ypd03008',
        }),
      );
    };
    // test();
  }

  async loginMemberInfo({
    email_id,
    password,
  }: LoginMemberInfoInput): Promise<LoginMemberInfoOutput> {
    try {
      const MemberInfo = await this.memberInfoRepo.findOneOrFail({
        where: { email_id },
      });
      const ok = MemberInfo.checkPassword(password);
      if (!ok) return { ok: false, error: '잘못된 비밀번호 입니다.' };
      const token = this.jwtService.sign({
        email_id: MemberInfo.email_id,
      });
      return {
        ok: true,
        token,
      };
    } catch (error) {
      return { ok: false, error: '가입된 이메일 정보가 없습니다.' };
    }
  }

  async createMemberInfo() {}
  async updateMemberInfo() {}
  async deleteMemberInfo() {}

  async getMemberInfo({
    email_id,
  }: GetMemberInfoInput): Promise<GetMemberInfoOutput> {
    try {
      const memberInfo = await this.memberInfoRepo.findOneOrFail({ email_id });
      return { ok: true, memberInfo };
    } catch (error) {
      return {
        ok: false,
        error: '존재하지 않는 사용자 ID',
      };
    }
  }
  async getMembersInfo() {}

  // 조회회원 매핑 테이블을 찾는다.
  async getLookupMemberList({
    lookup_customer_id,
    strategy_code,
  }: getLookupMemberListInput): Promise<getLookupMemberListOutput> {
    try {
      const lookupMemberList = await this.lookupMemberListRepo.find({
        where: {
          lookup_customer_id,
          strategy_code,
        },
      });
      return {
        ok: true,
        lookupMemberList,
      };
    } catch (error) {
      this.logger.error(error);
      return { ok: false };
    }
  }
  // 특정 전략을 조회한 회원을 추가한다.
  async upsertLookupMember(
    strategy_code: number,
    email_id: string,
  ): Promise<boolean> {
    try {
      // 사용자와 전략이 존재하고, 조회회원 목록이 없다면
      if (
        (await this.strategyService.getStrategyById({ strategy_code })).ok ===
          true &&
        (await this.getMemberInfo({ email_id })).ok === true &&
        (
          await this.getLookupMemberList({
            lookup_customer_id: email_id,
            strategy_code,
          })
        ).ok === false
      ) {
        await this.getLookupMemberList({
          lookup_customer_id: email_id,
          strategy_code,
        });
      }
      // await Promise.all();
      // 추가
    } catch (error) {
      return false;
      // this.logger.error(error);
      // throw new Error('__upsertLookup error');
    }
  }
}
