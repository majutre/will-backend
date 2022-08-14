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

  update(id: string, attrs: Partial<Transaction>) {
    
  }
}
