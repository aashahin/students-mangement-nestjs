import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({
    default: () => `'${uuidv4()}'`,
  })
  userUUID: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    default: 'user',
  })
  role: string;
}
