import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repository: Repository<User>) {}

  create(email: string, password: string) {
    const user = this.repository.create({ email, password });
    const createdUser = this.repository.save(user)
    console.log(createdUser);
    return createdUser;
  }

  findById(id: number) {
    return this.repository.findOneBy({ id: id });
  }

  findByEmail(email: string) {
    return this.repository.findBy({ email: email });
  }

  async remove(id: number) {
    const user = await this.findById(id);

    if (!user) {
      throw new Error(`No users found with ID ${id}`);
    }

    return this.repository.remove(user);
  }
}
