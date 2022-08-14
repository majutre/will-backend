import { Test } from '@nestjs/testing';

import { AuthService } from './auth.service';
import { UsersService } from '../users.service';
import { User } from '../user.entity';
import { BadRequestException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: Partial<UsersService>;

  beforeEach(async () => {
    usersService = {
      findByEmail: () => Promise.resolve([]),
      create: (email: string, password: string) =>
        Promise.resolve({ id: 1, email, password } as User),
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

  it('should throw an error if user signs up with an e-mail in use', async () => {
    usersService.findByEmail = () =>
      Promise.resolve([{ id: 1, email: 'test', password: '123' } as User]);
    await expect(service.registration('asdf@asdf', '123456')).rejects.toEqual(
      new BadRequestException('Este e-mail já está em uso'),
    );
  });

  it('should throw an error if user tries to login with an unused email', async () => {
    await expect(service.login('asdf@asdf', '123456')).rejects.toEqual(
      new BadRequestException('E-mail ou senha inválidos'),
    );
  });
});
