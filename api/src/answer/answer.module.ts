import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerController } from './answer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from '../db/entities/answer.entity';
import { NotificationsModule } from '../notifications/notifications.module';
import { VotesModule } from '../votes/votes.module';

@Module({
  imports: [TypeOrmModule.forFeature([Answer]), NotificationsModule],
  controllers: [AnswerController],
  providers: [AnswerService],
  exports: [AnswerService],
})
export class AnswerModule {}
