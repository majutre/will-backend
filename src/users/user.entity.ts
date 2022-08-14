import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    default: 0,
    nullable: true,
  })
  cashback: number;

  // @OneToMany(() => Transaction, (transaction) => transaction.user)
  // transactions: Transaction[];
}