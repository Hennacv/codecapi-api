import { Column, Entity, OneToMany } from 'typeorm';
import { Answer } from './answer.entity';
import { CustomBaseEntity } from './custom-base-entity';
import { Question } from './question.entity';

@Entity()
export class User extends CustomBaseEntity {
  @Column({ unique: true })
  uid: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @OneToMany(() => Question, (question) => question.user)
  questions: Question[];

  @OneToMany(() => Answer, (answer) => answer.user)
  answer: Answer[];
}
