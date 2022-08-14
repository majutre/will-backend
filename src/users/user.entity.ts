import { Entity, Column, PrimaryGeneratedColumn, OneToMany, AfterInsert, AfterRemove } from 'typeorm';

import { Transaction } from 'src/transactions/transaction.entity';

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

  @AfterInsert()
  logInsert() {
    console.log('Inserted User with id', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed User successfully');
  }
}