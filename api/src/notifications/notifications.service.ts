import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly eventEmitter: EventEmitter2,
  ) {}

  sentNotification(data: MessageEvent) {  
    this.eventEmitter.emit(data.type, JSON.stringify(data));
  }
}
