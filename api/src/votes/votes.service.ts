import { Injectable } from '@nestjs/common';
import { CreateVoteDto } from './dto/create-vote.dto';
import { UpdateVoteDto } from './dto/update-vote.dto';
import { Vote } from '../db/entities/vote.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class VotesService {
  constructor(
    @InjectRepository(Vote)
    private repo: Repository<Vote>,
  ) {}

  async create(createVoteDto: CreateVoteDto) {
    let vote = this.repo.create(createVoteDto);
    await vote.save();
    return this.fetchVote(vote.id);
  }

  async findOne(id: number) {
    return await this.fetchVote(id);
  }

  async update(id: number, updateVoteDto: UpdateVoteDto) {
    const vote = await this.fetchVote(id);
    Object.assign(vote, updateVoteDto);
    vote.save();
    return vote;
  }

  async remove(id: number) {
    const vote = await Vote.findOneByOrFail({ id });
    await this.repo.remove(vote);
  }

  async fetchVote(id: number) {
    return await Vote.findOneOrFail({
      where: { id },
      relations: ['user', 'question'],
    });
  }
}
