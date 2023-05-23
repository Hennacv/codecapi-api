import { UsersService } from './../users/users.service';
import { Injectable } from '@nestjs/common';
import { QuestionsService } from '../questions/questions.service';
import { AnswerService } from '../answer/answer.service';

@Injectable()
export class ProfileService {

  constructor(
    private usersService: UsersService,
    private questionService: QuestionsService,
    private answerService: AnswerService,
    ) {}

  async findAll(id: number) {
    const user = await this.usersService.findUserById(id)
    const questionCount = await this.questionService.fetchQuestionCount(id)
    const answerCount = await this.answerService.fetchAnswerCount(id)
      return {"user": user, "questionCount": questionCount, "answerCount" : answerCount }
    }
}
