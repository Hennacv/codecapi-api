import { Column, Entity, ManyToMany, OneToMany, JoinTable } from 'typeorm';
import { Answer } from './answer.entity';
import { CustomBaseEntity } from './custom-base-entity';
import { Question } from './question.entity';
import { Vote } from './vote.entity';
import { Tag } from './tag.entity';
import { Comment } from './comment.entity';

@Entity()
export class User extends CustomBaseEntity {
  @Column({ unique: true })
  uid: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => Question, (question) => question.user)
  questions: Question[];

  @OneToMany(() => Answer, (answer) => answer.user)
  answer: Answer[];

  @OneToMany(() => Vote, (vote) => vote.user)
  votes: Vote[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @ManyToMany(() => Tag, { cascade: true, onDelete: 'CASCADE' })
  @JoinTable()
  tags: Tag[];
}
