import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { CustomBaseEntity } from './custom-base-entity';
import { User } from './user.entity';
import { Comment } from './comment.entity';

@Entity()
export class Announcements extends CustomBaseEntity {
  @Column({ name: 'user_id', nullable: true })
  userId: number;

  @ManyToOne(() => User, (user) => user.announcements, { onDelete: 'SET NULL' })
  user: User;

  @Column()
  title: string;

  @Column({type: 'json', default: [], nullable: true})
  blocks: Block[];

  @Column()
  type: string;

  @Column({ nullable: true })
  date: string;

  @Column({ nullable: true })
  time: string;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  image: string;

  @OneToMany(() => Comment, (comment) => comment.announcements)
  comments: Comment[];
}