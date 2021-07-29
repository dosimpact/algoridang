import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from 'src/auth/jwt.service';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { StrategyService } from 'src/strategy/strategy.service';
import { Repository } from 'typeorm';
import {
  CreateMemberInfoInput,
  CreateMemberInfoOutput,
  UpdateMemberInfoInput,
  UpdateMemberInfoOutput,
} from './dtos/mutation.dtos';
import {
  GetLookupMemberListInput,
  GetLookupMemberListOutput,
  GetMemberInfoListInput,
  GetMemberInfoListOutput,
  GetOperationMemberListInput,
  GetOperationMemberListOutput,
  MeInput,
  MeOutput,
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

  async getMemberInfo({
    email_id,
  }: GetMemberInfoInput): Promise<GetMemberInfoOutput> {
    try {
      const memberInfo = await this.memberInfoRepo.findOne({
        where: {
          email_id,
        },
      });
      if (!memberInfo)
        return {
          ok: false,
          error: '존재하지 않는 사용자 ID',
        };
      return { ok: true, memberInfo };
    } catch (error) {
      this.logger.error(error);
      return {
        ok: false,
      };
    }
  }
  async getMemberInfoList({
    skip = 0,
    take = 100,
  }: GetMemberInfoListInput): Promise<GetMemberInfoListOutput> {
    try {
      const [memberInfoList, totalResult] =
        await this.memberInfoRepo.findAndCount({
          skip,
          take,
        });
      return {
        ok: true,
        memberInfoList,
        totalResult,
        totalPage: Math.ceil(totalResult / take),
      };
    } catch (error) {
      this.logger.error(error);
      return { ok: false };
    }
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

  async createMemberInfo({
    email_id,
    member_name,
    password,
  }: CreateMemberInfoInput): Promise<CreateMemberInfoOutput> {
    try {
      let memberInfo = await this.memberInfoRepo.findOne({
        where: { email_id },
      });
      if (memberInfo)
        return { ok: false, error: 'error: email is already taken' };
      memberInfo = await this.memberInfoRepo.save(
        this.memberInfoRepo.create({
          email_id,
          member_name,
          password,
        }),
      );
      return {
        ok: true,
        memberInfo,
      };
    } catch (error) {
      this.logger.error(error);
      return { ok: false };
    }
  }
  async updateMemberInfo({
    email_id,
    member_name,
    password,
  }: UpdateMemberInfoInput): Promise<UpdateMemberInfoOutput> {
    try {
      const res = await this.getMemberInfo({ email_id });
      if (!res.ok) return res;
      const memberInfo = res.memberInfo;
      if (member_name) memberInfo.member_name = member_name;
      if (password) memberInfo.password = password;
      await this.memberInfoRepo.save(memberInfo);
      return {
        ok: true,
        memberInfo,
      };
    } catch (error) {
      this.logger.error(error);
      return { ok: false };
    }
  }
  async deleteMemberInfo() {}

  // 조회회원 매핑 테이블을 찾는다.
  async getLookupMemberList({
    lookup_customer_id,
    strategy_code,
  }: GetLookupMemberListInput): Promise<GetLookupMemberListOutput> {
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
  ): Promise<CoreOutput> {
    const lookup_customer_id = email_id;
    try {
      // 사용자와 전략이 존재하고, 조회회원 목록이 없다면
      if (
        (await this.strategyService.getStrategyById({ strategy_code })).ok &&
        (await this.getMemberInfo({ email_id })).ok &&
        (await this.getLookupMemberList({ lookup_customer_id, strategy_code }))
          .ok === false
      ) {
        await this.lookupMemberListRepo.save(
          this.lookupMemberListRepo.create({
            lookup_customer_id,
            strategy_code,
          }),
        );
        return { ok: true };
      } else {
        return { ok: false };
      }
      // await Promise.all();
      // 추가
    } catch (error) {
      this.logger.error(error);
      return { ok: false };
    }
  }
  // 전략 가동 매핑 테이블을 찾는다.
  async getOperationMemberList({
    operation_customer_id,
    strategy_code,
  }: GetOperationMemberListInput): Promise<GetOperationMemberListOutput> {
    try {
      const operationMemberList = await this.operationMemberListRepo.find({
        where: {
          operation_customer_id,
          strategy_code,
        },
      });
      return {
        ok: true,
        operationMemberList,
      };
    } catch (error) {
      this.logger.error(error);
      return { ok: false };
    }
  }

  // 특정 전략을 운용하는 회원을 추가한다.
  async upsertOperationMember(
    strategy_code: number,
    email_id: string,
  ): Promise<CoreOutput> {
    const operation_customer_id = email_id;
    try {
      // 사용자와 전략이 존재하고, 구동 회원 목록이 없다면
      if (
        (await this.strategyService.getStrategyById({ strategy_code })).ok &&
        (await this.getMemberInfo({ email_id })).ok &&
        (
          await this.getOperationMemberList({
            operation_customer_id,
            strategy_code,
          })
        ).ok === false
      ) {
        await this.operationMemberListRepo.save(
          this.operationMemberListRepo.create({
            operation_customer_id,
            strategy_code,
          }),
        );
        return { ok: true };
      } else {
        return { ok: false };
      }
      // await Promise.all();
      // 추가
    } catch (error) {
      this.logger.error(error);
      return { ok: false };
    }
  }
}
