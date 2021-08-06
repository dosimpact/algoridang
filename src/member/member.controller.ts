import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  Param,
  Query,
  Version,
} from '@nestjs/common';
import { AuthUser, Roles } from 'src/auth/auth.decorator';
import {
  CreateMemberInfoInput,
  UpdateMemberInfoInput,
  UpsertLookupMemberInput,
  UpsertOperationMemberInput,
} from './dtos/mutation.dtos';
import { LoginMemberInfoInput } from './dtos/query.dtos';
import { MemberInfo } from './entities';
import { MemberService } from './member.service';

@Controller('/api/member/')
export class MemberQueryController {
  constructor(private readonly memberService: MemberService) {}

  @Version('1')
  @Get('me')
  async me(@Request() req, @AuthUser() MemberInfo) {
    // console.log('MemberInfo', req['MemberInfo']);
    // console.log('AuthMemberInfo', MemberInfo);
    return MemberInfo;
    // return this.MemberInfoService.me();
  }
  @Version('1')
  @Get('getMemberInfo/:email_id')
  async getMemberInfo(@Param('email_id') email_id: string) {
    return this.memberService.getMemberInfo({ email_id });
  }
  // @Roles(["Admin"])
  @Version('1')
  @Get('getMemberInfoList')
  async getMemberInfoList(@Query('take') take, @Query('skip') skip) {
    return this.memberService.getMemberInfoList({ skip, take });
  }

  // 조회회원 매핑 테이블을 찾는다.
  @Version('1')
  @Get('getLookupMemberList/:strategy_code')
  async getLookupMemberList(
    @AuthUser() m: MemberInfo,
    @Param('strategy_code') strategy_code,
  ) {
    return this.memberService.getLookupMemberList({
      lookup_customer_id: m.email_id,
      strategy_code,
    });
  }
  // 전략 가동 중인 맴버 리턴 (매핑 테이블을 찾는다.)
  @Version('1')
  @Get('getOperationMemberList/:strategy_code')
  async getOperationMemberList(
    @AuthUser() m: MemberInfo,
    @Param('strategy_code') strategy_code,
  ) {
    return this.memberService.getOperationMemberList({
      operation_customer_id: m.email_id,
      strategy_code,
    });
  }
}

@Controller('/api/member/')
export class MemberMutationController {
  constructor(private readonly memberService: MemberService) {}

  @Version('1')
  @Post('loginMemberInfo')
  async loginMemberInfo(@Body() loginMemberInfoInput: LoginMemberInfoInput) {
    return this.memberService.loginMemberInfo(loginMemberInfoInput);
  }

  @Version('1')
  @Post('createMemberInfo')
  async createMemberInfo(@Body() createMemberInfoInput: CreateMemberInfoInput) {
    return this.memberService.createMemberInfo(createMemberInfoInput);
  }
  @Version('1')
  @Post('updateMemberInfo')
  async updateMemberInfo(@Body() updateMemberInfo: UpdateMemberInfoInput) {
    return this.memberService.updateMemberInfo(updateMemberInfo);
  }

  // @Roles(["Admin"])
  async deleteMemberInfo() {
    return this.memberService.deleteMemberInfo();
  }

  // 특정 전략을 조회한 회원을 추가한다.
  async upsertLookupMember(@Body() body: UpsertLookupMemberInput) {
    return this.memberService.upsertLookupMember(body);
  }

  // 특정 전략을 운용하는 회원을 추가한다.
  async upsertOperationMember(@Body() body: UpsertOperationMemberInput) {
    return this.memberService.upsertOperationMember(body);
  }
}
