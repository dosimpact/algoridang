import { forwardRef, Module } from '@nestjs/common';
import { MemberService } from './member.service';
import {
  MemberQueryController,
  MemberMutationController,
} from './member.controller';
import { LookupMemberList, MemberInfo, OperationMemberList } from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StrategyModule } from 'src/strategy/strategy.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MemberInfo,
      LookupMemberList,
      OperationMemberList,
    ]),
    forwardRef(() => StrategyModule),
  ],
  providers: [MemberService],
  controllers: [MemberQueryController, MemberMutationController],
  exports: [MemberService],
})
export class MemberModule {}
