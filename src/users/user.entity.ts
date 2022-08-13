import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Billet } from 'src/billets/billets.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Billet, (billet) => billet.user)
  billets: Billet[];
}