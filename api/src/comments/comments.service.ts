import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from '../db/entities/comment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private repo: Repository<Comment>,
  ) {}

  async create(createCommentDto: CreateCommentDto) {
    let comment = this.repo.create({ ...createCommentDto });
    await comment.save();
    return this.fetchComment(comment.id);
  }

  findOne(id: number) {
    return this.fetchComment(id);
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    const comment = await this.fetchComment(id);
    Object.assign(comment, updateCommentDto);
    comment.save();
    return comment;
  }

  async remove(id: number) {
    const comment = await Comment.findOneByOrFail({ id });
    await this.repo.remove(comment);
    return `Removed comment #${id}`;
  }

  async fetchComment(id: number) {
    return await Comment.findOneOrFail({
      where: { id },
      relations: ['answer', 'user'],
    });
  }
}
