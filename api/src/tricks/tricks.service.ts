import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../db/entities/user.entity';
import { CreateTrickDto } from './dto/create-trick.dto';
import { Tricks } from '../db/entities/tricks.entity';

@Injectable()
export class TrickService {
  constructor(
    @InjectRepository(Tricks)
    private repo: Repository<Tricks>,
  ) {}

  async create(createTrickDto: CreateTrickDto, user: User) {
    let trick = this.repo.create({ ...createTrickDto, userId: user.id });
    await trick.save();
    return this.fetchTrick(trick.id);
  }

  async findAll() {
    const tricks = await Tricks.find({
      relations: ['user', 'votes.user'],
      order: {
        createdAt: 'desc',
      },
    });
    return tricks;
  }

  async findOne(id: number) {
    return await this.fetchTrick(id);
  }

  async fetchTrick(id: number) {
    return await Tricks.findOneOrFail({
      where: { id },
      relations: ['user'],
    });
  }
}
