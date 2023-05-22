import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { User } from '../db/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private em: EntityManager) {}

  async findAll() {
    const users = await this.em.find(User);
    return users;
  }

  async findOne(uid: string) {
    const user = await this.em.findOneByOrFail(User, { uid });
    return user;
  }
}
