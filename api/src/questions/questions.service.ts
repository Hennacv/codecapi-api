import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from '../db/entities/question.entity';
import { Tag } from '../db/entities/tag.entity';
import { User } from '../db/entities/user.entity';
import { AddTagDto } from './dto/add-tag.dto';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private repo: Repository<Question>,
    private notificationService: NotificationsService,
  ) {}

  async create(createQuestionDto: CreateQuestionDto, user: User) {
    let question = this.repo.create({ ...createQuestionDto, userId: user.id });
    await question.save().then(() => {
      this.notificationService.sentNotification({
        type: 'new-question',
        user: {
          userId: user.id,
          userName: user.name,
        },
        questionId: question.id,
      });
    });
    return this.fetchQuestion(question.id);
  }

  async findAll() {
    const questions = await Question.find({
      relations: ['answer', 'tags', 'user'],
      order: {
        createdAt: 'desc',
        tags: {
          title: 'asc',
        },
      },
    });

    return questions;
  }

  async findOne(id: number) {
    return await this.fetchQuestion(id);
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto) {
    const question = await this.fetchQuestion(id);
    Object.assign(question, updateQuestionDto);
    question.save();
    return question;
  }

  async remove(id: number) {
    const question = await Question.findOneByOrFail({ id });
    await this.repo.remove(question);
  }

  async addTag(id: number, { tagId }: AddTagDto) {
    const question = await this.fetchQuestion(id);
    const tag = await Tag.findOneByOrFail({ id: tagId });
    question.tags.push(tag);
    await question.save();
    return this.fetchQuestion(question.id);
  }

  async removeTag(id: number, tagId: number) {
    const question = await Question.findOneByOrFail({ id });
    question.tags = question.tags.filter((tag) => tag.id !== tagId);
    await question.save();
  }

  async fetchQuestion(id: number) {
    return await Question.findOneOrFail({
      where: { id },
      relations: ['answer.user', 'tags', 'user'],
      order: {
        tags: {
          title: 'asc',
        },
      },
    });
  }
}
