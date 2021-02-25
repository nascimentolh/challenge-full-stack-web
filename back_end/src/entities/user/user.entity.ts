import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { TimesTampsEntity } from '../base/timestampsEntity';
import { Student } from './student.entity';

@Entity('users')
export class User extends TimesTampsEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  @Unique(['email'])
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  lastAccess: string;

  @Column({ default: false })
  isStaff: boolean;

  @Column({ default: true })
  isActive: boolean;

  @OneToOne(() => Student, (student) => student.user)
  student: Student;
}
