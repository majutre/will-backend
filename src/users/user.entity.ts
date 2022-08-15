import { Transaction } from 'src/transactions/transaction.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  admin: boolean;

  @Column({
    type: 'decimal',
    default: 0.0,
    precision: 10, 
    scale: 2,
  })
  cashback: string;

  @OneToMany(() => Transaction, (transaction) => transaction.user)
  transactions: Transaction[];
}