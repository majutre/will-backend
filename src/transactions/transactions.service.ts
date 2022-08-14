import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Transaction } from './transaction.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction) private repository: Repository<Transaction>,
  ) {}

  create(billet: string, amount: string) {
    const transaction = this.repository.create({ billet, amount });

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
