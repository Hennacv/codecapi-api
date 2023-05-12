interface Block {
  position: number;
  type: 'code' | 'text';
  value: string;
  contents?: string;
  language?: string;
}

interface MessageUser {
  userId: number;
  userName: string;
}

interface BaseMessageEvent {
  type: string;
  user: MessageUser;
}

interface QuestionMessageEvent extends BaseMessageEvent {
  type: 'new-question';
  questionId: number;
}

interface AnswerMessageEvent extends BaseMessageEvent {
  type: 'new-answer';
  questionId: number;
}

type MessageEvent = QuestionMessageEvent | AnswerMessageEvent;