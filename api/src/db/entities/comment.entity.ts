import { Column, Entity, ManyToOne } from 'typeorm';
import { CustomBaseEntity } from './custom-base-entity';
import { Answer } from './answer.entity';
import { User } from './user.entity';
import { Announcements } from './announcement.entity';
import { Trick } from './trick.entity';

@Entity()
export class Comment extends CustomBaseEntity {
  @Column()
  comment: string;

  @Column({ nullable: true })
  userId: number;

  @ManyToOne(() => User, (user) => user.comments, { onDelete: 'CASCADE' })
  user: User;

  @Column({ nullable: true })
  answerId: number;

  @ManyToOne(() => Answer, (answer) => answer.comments, { onDelete: 'CASCADE' })
  answer: Answer;

  @Column({ nullable: true })
  trickId: number;

  @ManyToOne(() => Trick, (trick) => trick.comments, { onDelete: 'CASCADE' })
  trick: Trick;

  @Column({ nullable: true })
  announcementsId: number;

  @ManyToOne(() => Announcements, (announcements) => announcements.comments, { onDelete: 'CASCADE' })
  announcements: Announcements;
}
