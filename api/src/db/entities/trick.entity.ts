import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { CustomBaseEntity } from './custom-base-entity';
import { User } from './user.entity';
import { Vote } from './vote.entity';
import { Comment } from './comment.entity';

@Entity()
export class Trick extends CustomBaseEntity {
  @Column({ nullable: true })
  userId: number;

  @ManyToOne(() => User, (user) => user.trick, { onDelete: 'SET NULL' })
  user: User;

  @Column()
  title: string;

  @Column({type: 'json', default: [], nullable: true})
  blocks: Block[];

  @OneToMany(() => Vote, (vote) => vote.trick)
  votes: Vote[];

  @OneToMany(() => Comment, (comment) => comment.trick)
  comments: Comment[];
}
