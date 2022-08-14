import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users.service';

describe('AuthService', () => {
  it('should create an instance of AuthService', async () => {
    const usersService = {
      findByEmail: () => Promise.resolve([]),
      create: (email: string, password: string) =>
        Promise.resolve({ id: 1, email, password }),
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

    const service = module.get(AuthService);

    expect(service).toBeDefined();
  });
});
