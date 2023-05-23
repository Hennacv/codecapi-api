import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { QuestionsModule } from '../questions/questions.module';
import { AnswerModule } from '../answer/answer.module';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [ProfileController],
  providers: [ProfileService],
  imports: [QuestionsModule, AnswerModule, UsersModule],
})
export class ProfileModule {}
