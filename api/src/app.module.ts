import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { dbConfig } from './db/data-source';
import { AuthenticateMiddleware } from './middleware/authenticate.middleware';
import { QuestionsModule } from './questions/questions.module';
import { TagsModule } from './tags/tags.module';
import { UsersModule } from './users/users.module';
import { AnswerModule } from './answer/answer.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { NotificationsModule } from './notifications/notifications.module';
import { VotesModule } from './votes/votes.module';
import { ProfileModule } from './profile/profile.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [TypeOrmModule.forRoot(dbConfig), QuestionsModule, TagsModule, UsersModule, AuthModule, AnswerModule, EventEmitterModule.forRoot(), NotificationsModule, VotesModule, CommentsModule, ProfileModule],
})

export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticateMiddleware).exclude('auth', 'auth/redirect').forRoutes('*');
  }
}
