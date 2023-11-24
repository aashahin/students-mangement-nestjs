import { Column, Entity, ManyToMany, PrimaryGeneratedColumn, JoinTable } from 'typeorm';
import { Course } from './course.entity';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column('json', { nullable: true })
  address: [];

  @JoinTable()
  @ManyToMany(() => Course, (course) => course.students, { cascade: true })
  courses: Course[];
}
