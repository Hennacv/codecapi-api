import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../db/entities/user.entity';
import { CreateTrickDto } from './dto/create-trick.dto';
import { Tricks } from '../db/entities/tricks.entity';
import { UpdateTrickDto } from './dto/update-trick.dto';

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

  async update(id: number, updateTrickDto: UpdateTrickDto) {
    const question = await this.fetchTrick(id);
    Object.assign(question, updateTrickDto);
    question.save();
    return question;
  }

  async remove(id: number) {
    const trick = await Tricks.findOneByOrFail({ id });
    await this.repo.remove(trick);
  }

  async findAll() {
    const tricks = await Tricks.find({
      relations: ['user', 'votes.user', 'comments.user'],
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
      relations: ['user', 'comments'],
    });
  }
}
