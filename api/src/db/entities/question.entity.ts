import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { Answer } from './answer.entity';
import { CustomBaseEntity } from './custom-base-entity';
import { Tag } from './tag.entity';
import { User } from './user.entity';

@Entity()
export class Question extends CustomBaseEntity {
  // user_id is nullable because when a user gets deleted, we don't want
  // to delete all of the questions associated with the user
  @Column({ name: 'user_id', nullable: true })
  userId: number;

  @ManyToOne(() => User, (user) => user.questions, { onDelete: 'SET NULL' })
  user: User;

  @Column()
  title: string;

  @Column({type: 'json', default: [], nullable: true})
  blocks: Block[];

  @ManyToMany(() => Tag, { cascade: true, onDelete: 'CASCADE' })
  @JoinTable()
  tags: Tag[];

  @OneToMany(() => Answer, (answer) => answer.question)
  answer: Answer[];
}
