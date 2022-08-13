import { BadRequestException, Injectable } from '@nestjs/common';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { UsersService } from 'src/users/users.service';
import { promisify } from 'util';

const scrypt = promisify(_scrypt)

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService){}

  async registration(email: string, password: string) {
    const users = await this.usersService.findByEmail(email);
    if (users.length) {
      throw new BadRequestException('Este e-mail já está em uso')
    }

    const salt = randomBytes(8).toString('hex');
    const key = (await promisify(scrypt)(password, salt, 32)) as Buffer;

    const result = salt + '.' + key.toString('hex');

    const user = await this.usersService.create(email, result);

    return user;
  }

  signin() {}
}
