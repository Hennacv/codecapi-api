import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { User } from '../db/entities/user.entity';
import { AddTagDto } from '../questions/dto/add-tag.dto';
import { Tag } from '../db/entities/tag.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private em: EntityManager) {}

  async findAll() {
    const users = await User.find({ relations: ['tags'] });
    return users;
  }

  async findOne(uid: string) {
    const user = await this.fetchUser( uid );
    return user;
  }

  async findUserById(id: number) {
    const user = await User.findOneOrFail({where: { id }, relations: ['tags'],});
    return user;
  }

  async update(id: number, updateUserDto:  UpdateUserDto ) {
    const user = await this.findUserById(id);
    Object.assign(user, updateUserDto);
    user.save();
    return user;
  }

  async addTag(uid: string, { tagId }: AddTagDto) {
    const user = await this.fetchUser(uid);
    const tag = await Tag.findOneByOrFail({ id: tagId });
    user.tags.push(tag);
    await user.save();
    return this.fetchUser(user.uid);
  }

  async removeTag(uid: string, tagId: number) {
    const user = await User.findOneByOrFail({ uid });
    user.tags = user.tags.filter((tag) => tag.id !== tagId);
    await user.save();
  }

  async fetchUser(uid: string) {
    return await User.findOneOrFail({
      where: { uid },
      relations: ['tags'],
      order: {
        tags: {
          title: 'asc',
        },
      },
    });
  }
}
