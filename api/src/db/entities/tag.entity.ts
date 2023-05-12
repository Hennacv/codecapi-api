import { Column, Entity } from 'typeorm';
import { CustomBaseEntity } from './custom-base-entity';

@Entity()
export class Tag extends CustomBaseEntity {
  @Column({ unique: true })
  title: string;

  @Column({ nullable: true })
  color: string;
}
