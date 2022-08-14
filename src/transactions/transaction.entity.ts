import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from 'src/users/user.entity';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  billet: string;

  @Column()
  amount: string;

  @Column({ nullable: true })
  transactionId: string;

  // @ManyToOne(() => User, (user) => user.transactions)
  // user: User;
}
