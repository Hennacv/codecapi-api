import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { CustomBaseEntity } from "./custom-base-entity";
import { User } from './user.entity';
import { Question } from './question.entity';
import { Vote } from "./vote.entity";

@Entity()
export class Answer extends CustomBaseEntity{

  @Column({ name: 'user_id', nullable: true })
  userId: number;

  @ManyToOne(() => User, (user) => user.questions, { onDelete: 'SET NULL' })
  user: User;

  @Column({ nullable: false })
  questionId: number;

  @ManyToOne(() => Question, (question) => question.answer, { onDelete: 'CASCADE' })
  question: Question;

  @Column({type: 'json', default: []})
  blocks: Block[];

  @OneToMany(() => Vote, (vote) => vote.answer)
  votes: Vote[];
}