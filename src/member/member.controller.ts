import {
  Controller,
  Get,
  Post,
  Body,
  Inject,
  Request,
  Param,
  Query,
} from '@nestjs/common';
import { AuthUser, Roles } from 'src/auth/auth.decorator';
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

  @Get('getMemberInfo/:email_id')
  async getMemberInfo(@Param('email_id') email_id: string) {
    return this.memberService.getMemberInfo({ email_id });
  }
  // @Roles(["Admin"])
  @Get('getMemberInfoList')
  async getMemberInfoList(@Query('take') take, @Query('skip') skip) {
    return this.memberService.getMemberInfoList({ skip, take });
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

  // @Roles(["Admin"])
  async deleteMemberInfo() {
    return this.memberService.deleteMemberInfo();
  }
}
