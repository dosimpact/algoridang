import { Module } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberController } from './member.controller';
import { MemberResolver } from './member.resolver';

@Module({
  controllers: [MemberController],
  providers: [MemberService, MemberResolver]
})
export class MemberModule {}
