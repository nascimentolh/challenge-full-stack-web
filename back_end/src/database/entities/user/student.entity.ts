import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { TimesTampsEntity } from '../base/timestampsEntity';
import { User } from './user.entity';

@Entity('students')
export class Student extends TimesTampsEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'bigint' })
  @Unique(['ra'])
  ra: number;

  @Column()
  @Unique(['cpf'])
  cpf: string;

  @OneToOne(() => User, (user) => user.student)
  @JoinColumn()
  user: User;
}
