import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from 'src/auth/jwt.service';
import { Repository } from 'typeorm';
import {
  GetUserInput,
  GetUserOutput,
  LoginUserInput,
  LoginUserOutput,
} from './dtos/query.dtos';
import { USER } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(USER)
    private readonly userRepo: Repository<USER>,
    private readonly jwtService: JwtService,
  ) {
    const test = async () => {
      await this.userRepo.save(
        this.userRepo.create({
          EMAIL: 'taker01@naver.com',
          PASSWORD: 'taker01',
          NAME: 'taker01',
        }),
      );
    };
    // test();
  }

  async loginUser({
    EMAIL,
    PASSWORD,
  }: LoginUserInput): Promise<LoginUserOutput> {
    try {
      const user = await this.userRepo.findOneOrFail({ where: { EMAIL } });
      const ok = user.checkPassword(PASSWORD);
      if (!ok) return { ok: false, error: '잘못된 비밀번호 입니다.' };
      const token = this.jwtService.sign({ userId: user.ID });
      return {
        ok: true,
        token,
      };
    } catch (error) {
      return { ok: false, error: '가입된 이메일 정보가 없습니다.' };
    }
  }
  async me() {
    return 'me';
  }

  async createUser() {}
  async updateUser() {}
  async deleteUser() {}

  async getUser({ ID }: GetUserInput): Promise<GetUserOutput> {
    try {
      const user = await this.userRepo.findOneOrFail({ ID });
      return { ok: true, user };
    } catch (error) {
      return {
        ok: false,
        error: '존재하지 않는 사용자 ID',
      };
    }
  }
  async getUserList() {}
}
