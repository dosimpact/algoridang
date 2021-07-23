import { Controller, Get, Post, Body, Inject, Request } from '@nestjs/common';
import { AuthUser } from 'src/auth/auth.decorator';
import { GetMemberInfoInput, LoginMemberInfoInput } from './dtos/query.dtos';
import { MemberService } from './member.service';

@Controller('/api/member/')
export class MemberController {
  constructor(
    @Inject(MemberService.name)
    private readonly memberService: MemberService,
  ) {}

  @Post('login-member-info')
  async loginMemberInfo(@Body() loginMemberInfoInput: LoginMemberInfoInput) {
    return this.memberService.loginMemberInfo(loginMemberInfoInput);
  }

  @Get('me')
  async me(@Request() req, @AuthUser() MemberInfo) {
    // console.log('MemberInfo', req['MemberInfo']);
    // console.log('AuthMemberInfo', MemberInfo);
    return MemberInfo;
    // return this.MemberInfoService.me();
  }
  async createMemberInfo() {
    return this.memberService.createMemberInfo();
  }
  async updateMemberInfo() {
    return this.memberService.updateMemberInfo();
  }
  async deleteMemberInfo() {
    return this.memberService.deleteMemberInfo();
  }
  async getMemberInfo(getMemberInfoInput: GetMemberInfoInput) {
    return this.memberService.getMemberInfo(getMemberInfoInput);
  }
  async getMembersInfo() {
    return this.memberService.getMembersInfo();
  }
}
