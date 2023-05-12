import { Controller, Sse } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Observable, merge } from 'rxjs';

@Controller('events')
export class NotificationsController {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  @Sse('stream')
  stream() {
    const newQuestionEvent = 'new-question';
    const newQuestionObservable = new Observable((observer) => {
      const listener = (data: QuestionMessageEvent) => observer.next(data);
      this.eventEmitter.on(newQuestionEvent, listener);
      return () => this.eventEmitter.off(newQuestionEvent, listener);
    });

    const newAnswerEvent = 'new-answer';
    const newAnswerObservable = new Observable((observer) => {
      const listener = (data: AnswerMessageEvent) => observer.next(data);
      this.eventEmitter.on(newAnswerEvent, listener);
      return () => this.eventEmitter.off(newAnswerEvent, listener);
    });

    const keepConnectionAlive = new Observable((observer) => {
      setInterval(() => {
        observer.next({ping: 'ping message'});
      }, 40000)
    });

    return merge(newQuestionObservable, newAnswerObservable, keepConnectionAlive);
  }
}