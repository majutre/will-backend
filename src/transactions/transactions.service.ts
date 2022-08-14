import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateTransactionDto } from './dtos/create-transaction.dto';

import { Transaction } from './transaction.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction) private repository: Repository<Transaction>,
    private usersService: UsersService
  ) {}

  create(transactionDto: CreateTransactionDto, user: User) {
    const transaction = this.repository.create(transactionDto);
    transaction.user = user;
    this.usersService.addCashback(user.id, parseFloat(transactionDto.amount))
    
    return this.repository.save(transaction);
  }

  async update(id: number, attrs: Partial<Transaction>) {
    const transaction = await this.findOne(id);

    if (!transaction) {
      throw new Error('Nenhum registro encontrado');
    }

    Object.assign(transaction, attrs);

    return this.repository.save(transaction);
  }

  findOne(id: number) {
    if (!id) {
      return null;
    }
    return this.repository.findOneBy({ id: id });
  }
}
