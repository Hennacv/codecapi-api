import { Column, Entity, ManyToOne } from 'typeorm';
import { CustomBaseEntity } from './custom-base-entity';
import { User } from './user.entity';

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
}