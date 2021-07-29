import {
  Controller,
  Get,
  Post,
  Body,
  Inject,
  Request,
  Param,
} from '@nestjs/common';
import { AuthUser } from 'src/auth/auth.decorator';
import {
  CreateMemberInfoInput,
  UpdateMemberInfoInput,
} from './dtos/mutation.dtos';
import { GetMemberInfoInput, LoginMemberInfoInput } from './dtos/query.dtos';
import { MemberService } from './member.service';

@Controller('/api/member/')
export class MemberController {
  constructor(
    @Inject(MemberService.name)
    private readonly memberService: MemberService,
  ) {}

  @Get('me')
  async me(@Request() req, @AuthUser() MemberInfo) {
    // console.log('MemberInfo', req['MemberInfo']);
    // console.log('AuthMemberInfo', MemberInfo);
    return MemberInfo;
    // return this.MemberInfoService.me();
  }

  async deleteMemberInfo() {
    return this.memberService.deleteMemberInfo();
  }

  @Get('getMemberInfo/:email_id')
  async getMemberInfo(@Param('email_id') email_id: string) {
    return this.memberService.getMemberInfo({ email_id });
  }

  async getMembersInfo() {
    return this.memberService.getMembersInfo();
  }
  @Post('loginMemberInfo')
  async loginMemberInfo(@Body() loginMemberInfoInput: LoginMemberInfoInput) {
    return this.memberService.loginMemberInfo(loginMemberInfoInput);
  }

  @Post('createMemberInfo')
  async createMemberInfo(@Body() createMemberInfoInput: CreateMemberInfoInput) {
    return this.memberService.createMemberInfo(createMemberInfoInput);
  }

  @Post('updateMemberInfo')
  async updateMemberInfo(@Body() updateMemberInfo: UpdateMemberInfoInput) {
    return this.memberService.updateMemberInfo(updateMemberInfo);
  }
}
