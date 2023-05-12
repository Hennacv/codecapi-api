import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from '../db/entities/tag.entity';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private repo: Repository<Tag>,
  ) {}

  async create(createTagDto: CreateTagDto) {
    const tag = this.repo.create(createTagDto);
    await tag.save();
    return tag;
  }

  async findAll() {
    const tags = await Tag.find({
      order: {
        title: 'asc',
      },
    });
    return tags;
  }

  async findOne(id: number) {
    return await this.repo.findOneByOrFail({
      id,
    });
  }

  async update(id: number, updateQuestionDto: UpdateTagDto) {
    const tag = await this.repo.findOneByOrFail({ id });
    Object.assign(tag, updateQuestionDto);
    tag.save();
    return tag;
  }

  async remove(id: number) {
    const tag = await this.repo.findOneByOrFail({ id });
    await this.repo.remove(tag);
  }
}
