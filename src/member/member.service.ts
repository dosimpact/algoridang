import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from 'src/auth/jwt.service';
import { Repository } from 'typeorm';
import {
  GetMemberInfoInput,
  GetMemberInfoOutput,
  LoginMemberInfoInput,
  LoginMemberInfoOutput,
} from './dtos/query.dtos';
import { MemberInfo } from './entities';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(MemberInfo)
    private readonly memberInfoRepo: Repository<MemberInfo>,
    private readonly jwtService: JwtService,
  ) {}

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
        id: MemberInfo.email_id,
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
}
