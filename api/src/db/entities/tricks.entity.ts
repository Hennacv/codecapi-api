import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { CustomBaseEntity } from './custom-base-entity';
import { User } from './user.entity';
import { Vote } from './vote.entity';
import { Comment } from './comment.entity';

@Entity()
export class Tricks extends CustomBaseEntity {
  @Column({ name: 'user_id', nullable: true })
  userId: number;

  @ManyToOne(() => User, (user) => user.tricks, { onDelete: 'SET NULL' })
  user: User;

  @Column()
  title: string;

  @Column({type: 'json', default: [], nullable: true})
  blocks: Block[];

  @OneToMany(() => Vote, (vote) => vote.tricks)
  votes: Vote[];

  @OneToMany(() => Comment, (comment) => comment.tricks)
  comments: Comment[];
}
