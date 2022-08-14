import { Test } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';

import { AuthService } from './auth.service';
import { UsersService } from '../users.service';
import { User } from '../user.entity';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: Partial<UsersService>;

  beforeEach(async () => {
    const users: User[] = [];
    usersService = {
      findByEmail: (email: string) => {
        const filteredUsers = users.filter((user) => user.email === email);
        return Promise.resolve(filteredUsers);
      },
      create: (email: string, password: string) => {
        const user = {
          id: Math.floor(Math.random() * 128),
          email,
          password,
        } as User;
        users.push(user);
        return Promise.resolve(user);
      },
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: usersService,
        },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('should create an instance of AuthService', async () => {
    expect(service).toBeDefined();
  });

  it('should create a new user with salted and hashed password', async () => {
    const user = await service.registration('asdf@asdf', '123456');

    expect(user.password).not.toEqual('123456');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('should return a user if correct password is provided', async () => {
    await service.registration('asdf@asdf', '123456');
    const user = await service.login('asdf@asdf', '123456');
    expect(user).toBeDefined();
  });

  it('should throw an error if user signs up with an e-mail in use', async () => {
    await service.registration('asdf@asdf', '123456');
    await expect(service.registration('asdf@asdf', '123456')).rejects.toEqual(
      new BadRequestException('Este e-mail já está em uso'),
    );
  });

  it('should throw an error if user tries to login with an unused email', async () => {
    await expect(service.login('asdf@asdf', '123456')).rejects.toEqual(
      new BadRequestException('E-mail ou senha inválidos'),
    );
  });

  it('should throw an error if invalid password is provided', async () => {
    await service.registration('asdf@asdf', '1a2b3c');
    await expect(service.login('asdf@asdf', '123456')).rejects.toEqual(
      new BadRequestException('E-mail ou senha inválidos'),
    );
  });
});
