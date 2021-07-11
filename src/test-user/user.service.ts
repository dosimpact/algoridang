import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './entities/note.entity';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Note)
    private readonly noteRepo: Repository<Note>,
  ) {
    const test = async () => {
      // create user
      // await userRepo.save(
      //   userRepo.create({
      //     name: 'testuser_xx',
      //   }),
      // );

      // create note only
      const user = await userRepo.findOne({ name: 'testuser_xx' });

      await noteRepo.save(
        noteRepo.create({
          text: 'test note2',
          userId: 5,
        }),
      );

      const users = await userRepo.find({ relations: ['notes'] });
      console.log(users);
      console.log(users[0].notes);
      console.log(users[1].notes);
      // create note with user connection
      // const user = await userRepo.findOne({ name: 'testuser' });
      // await noteRepo.save(
      //   noteRepo.create({
      //     text: 'test note3',
      //     user
      //   }),
      // );
      console.log('----notes----');
      const notes = await noteRepo.find({ relations: ['user'] });
      console.log(notes);
    };
    // test();
  }
}
