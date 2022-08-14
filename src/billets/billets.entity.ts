import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from 'src/users/user.entity';

@Entity()
export class Billet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()  
  billet: string;

  @Column()
  amount: string;

  // @ManyToOne(() => User, (user) => user.billets)
  // user: User;
}