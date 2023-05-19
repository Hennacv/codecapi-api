import { Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { CustomBaseEntity } from './custom-base-entity';
import { User } from './user.entity';
import { Question } from './question.entity';
import { Answer } from './answer.entity';

@Entity()
@Index(['type', 'questionId', 'answerId'], { unique: true })
export class Vote extends CustomBaseEntity {
  @Column()
  type: string;
  
  @ManyToOne(() => Question, (question) => question.votes, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn()
  question: Question;

  @Column({ nullable: true })
  questionId: number;

  @ManyToOne(() => Answer, (answer) => answer.votes, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn()
  answer: Answer;

  @Column({ nullable: true })
  answerId: number;

  @ManyToOne(() => User, (user) => user.votes, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn()
  user: User;

  @Column({ nullable: true })
  userId: number;
}
