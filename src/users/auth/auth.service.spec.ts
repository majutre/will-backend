import { Test } from '@nestjs/testing';

import { AuthService } from './auth.service';
import { UsersService } from '../users.service';
import { User } from '../user.entity';

describe('AuthService', () => {
  it('should create an instance of AuthService', async () => {
    const usersService: Partial<UsersService> = {
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

    const service = module.get(AuthService);

    expect(service).toBeDefined();
  });
});
