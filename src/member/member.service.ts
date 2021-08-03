import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from 'src/auth/jwt.service';
import { CoreOutput } from 'src/common/dtos/output.dto';
import {
  AlreadyExistError,
  PasswordWrongError,
} from 'src/common/error/Custom-Error';
import { StrategyService } from 'src/strategy/strategy.service';
import { EntityNotFoundError, Repository } from 'typeorm';
import {
  CreateMemberInfoInput,
  CreateMemberInfoOutput,
  UpdateMemberInfoInput,
  UpdateMemberInfoOutput,
  UpsertLookupMemberInput,
  UpsertOperationMemberInput,
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
    const memberInfo = await this.memberInfoRepo.findOneOrFail({
      where: {
        email_id,
      },
    });
    return { ok: true, memberInfo };
  }
  async getMemberInfoList({
    skip = 0,
    take = 100,
  }: GetMemberInfoListInput): Promise<GetMemberInfoListOutput> {
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
  }

  async loginMemberInfo({
    email_id,
    password,
  }: LoginMemberInfoInput): Promise<LoginMemberInfoOutput> {
    const memberInfo = await this.memberInfoRepo.findOne({
      where: { email_id },
      select: ['password', 'email_id'],
    });

    if (!memberInfo)
      throw new EntityNotFoundError(
        MemberInfo,
        '가입된 이메일 정보가 없습니다.',
      ); //{ ok: false, error: '가입된 이메일 정보가 없습니다.' };

    const ok = await memberInfo.checkPassword(password);
    if (!ok) throw new PasswordWrongError('checkPassword fail');
    const token = this.jwtService.sign({
      email_id: memberInfo.email_id,
    });
    return {
      ok: true,
      token,
    };
  }

  async createMemberInfo({
    email_id,
    member_name,
    password,
  }: CreateMemberInfoInput): Promise<CreateMemberInfoOutput> {
    let memberInfo = await this.memberInfoRepo.findOne({
      where: { email_id },
    });

    if (memberInfo)
      throw new AlreadyExistError('error: email is already taken');

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
  }
  async updateMemberInfo({
    email_id,
    member_name,
    password,
  }: UpdateMemberInfoInput): Promise<UpdateMemberInfoOutput> {
    const res = await this.getMemberInfo({ email_id });
    const memberInfo = res.memberInfo;
    if (member_name) memberInfo.member_name = member_name;
    if (password) memberInfo.password = password;
    await this.memberInfoRepo.save(memberInfo);
    return {
      ok: true,
      memberInfo,
    };
  }
  async deleteMemberInfo() {}

  // 특정 전략을 조회한 회원리스트 (매핑 테이블을 찾는다.)
  async getLookupMemberList({
    lookup_customer_id,
    strategy_code,
  }: GetLookupMemberListInput): Promise<GetLookupMemberListOutput> {
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
  }
  // (10) 특정 전략을 조회한 회원을 추가한다.
  async upsertLookupMember({
    email_id,
    strategy_code,
  }: UpsertLookupMemberInput): Promise<CoreOutput> {
    const lookup_customer_id = email_id;
    // 사용자와 전략이 존재하고, 조회회원 목록이 없다면
    if (
      (await this.strategyService.getStrategyById({ strategy_code })).ok &&
      (await this.getMemberInfo({ email_id })).ok &&
      (await this.getLookupMemberList({ lookup_customer_id, strategy_code }))
        .lookupMemberList.length === 0
    ) {
      await this.lookupMemberListRepo.save(
        this.lookupMemberListRepo.create({
          lookup_customer_id,
          strategy_code,
        }),
      );
      return { ok: true };
    } else {
      throw new AlreadyExistError('cannot upsertLookupMember');
    }
    // await Promise.all();
    // 추가
  }
  // 전략 가동 중인 맴버 리턴 (매핑 테이블을 찾는다.)
  async getOperationMemberList({
    operation_customer_id,
    strategy_code,
  }: GetOperationMemberListInput): Promise<GetOperationMemberListOutput> {
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
  }

  //(12) 특정 전략을 운용하는 회원을 추가한다.
  async upsertOperationMember({
    email_id,
    strategy_code,
  }: UpsertOperationMemberInput): Promise<CoreOutput> {
    const operation_customer_id = email_id;
    // 사용자와 전략이 존재하고, 구동 회원 목록이 없다면
    if (
      (await this.strategyService.getStrategyById({ strategy_code })).ok &&
      (await this.getMemberInfo({ email_id })).ok &&
      (
        await this.getOperationMemberList({
          operation_customer_id,
          strategy_code,
        })
      ).operationMemberList.length === 0
    ) {
      await this.operationMemberListRepo.save(
        this.operationMemberListRepo.create({
          operation_customer_id,
          strategy_code,
        }),
      );
      return { ok: true };
    } else {
      throw new AlreadyExistError('cannot upsertOperationMember');
    }
    // await Promise.all();
    // 추가
  }
}
