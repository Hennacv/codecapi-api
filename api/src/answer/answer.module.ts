import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerController } from './answer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from '../db/entities/answer.entity';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [TypeOrmModule.forFeature([Answer]), NotificationsModule],
  controllers: [AnswerController],
  providers: [AnswerService]
})
export class AnswerModule {}
