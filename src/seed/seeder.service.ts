import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MemberInfo } from 'src/member/entities';
import { Repository } from 'typeorm';
import * as Chance from 'chance';
import { Logger } from '@nestjs/common';

@Injectable()
export class SeederService {
  private readonly logger = new Logger(SeederService.name);
  constructor(
    @InjectRepository(MemberInfo)
    private MemberInfoRepo: Repository<MemberInfo>,
  ) {}

  // (1) 사용자 n명을 추가하는 시더
  async seedMemberInfo(n: number) {
    try {
      await Promise.all(
        new Array(n).fill(0).map(async () => {
          return this.MemberInfoRepo.save(this.__createMemberInfo());
        }),
      );
      this.logger.log(`✔ seedMemberInfo ${n} done`);
      return true;
    } catch (error) {
      this.logger.error(`❌ seedMemberInfo fails`);
      return false;
    }
  }

  __createMemberInfo() {
    const email = Chance().email();
    return this.MemberInfoRepo.create({
      email_id: email, //Chance().email(),
      password: email, //Chance().age(),
      member_name: Chance().name(),
    });
  }
}
