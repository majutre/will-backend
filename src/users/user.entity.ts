import { Entity, Column, PrimaryGeneratedColumn, OneToMany, AfterInsert, AfterRemove } from 'typeorm';

import { Billet } from 'src/billets/billets.entity';

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

  // @OneToMany(() => Billet, (billet) => billet.user)
  // billets: Billet[];

  @AfterInsert()
  logInsert() {
    console.log('Inserted User with id', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed User successfully');
  }
}