import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Billet } from './billets.entity';

@Injectable()
export class BilletsService {
  constructor(@InjectRepository(Billet) private repository: Repository<Billet>) {}
  
  create(billet: string, amount: string) {
    const newBillet = this.repository.create({ billet, amount });

    return this.repository.save(newBillet);
  }
}
