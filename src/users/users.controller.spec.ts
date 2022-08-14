import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth/auth.service';

import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: Partial<UsersService>;
  let authService: Partial<AuthService>;

  beforeEach(async () => {
    usersService = {
      findById: (id: number) => {
        return Promise.resolve({id, email: 'asdf@asdf', password: '1a2b3c'} as User);
      },
      remove: (id: number) => {
        return Promise.resolve({id, email: 'asdf@asdf', password: '1a2b3c'} as User);
      },
    }
    authService = {
      // registration: () => {},
      // login: () => {},
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: usersService
        },
        {
          provide: AuthService,
          useValue: authService
        },
      ]
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
