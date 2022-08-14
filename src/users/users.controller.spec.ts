import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth/auth.service';

import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: Partial<UsersService>;
  let authService: Partial<AuthService>;
  let id: string = '123';
  let emailAndPasswordMock = { email: 'asdf@asdf', password: '1a2b3c' };

  beforeEach(async () => {
    usersService = {
      findById: (id: number) => {
        return Promise.resolve({
          id,
          email: 'asdf@asdf',
          password: '1a2b3c',
        } as User);
      },
      remove: (id: number) => {
        return Promise.resolve(emailAndPasswordMock as User);
      },
    };
    authService = {
      // registration: () => {},
      login: (email: string, password: string) => {
        return Promise.resolve({ id: 1, email, password } as User);
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: usersService,
        },
        {
          provide: AuthService,
          useValue: authService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('#findUser should return a user with given id', async () => {
    const user = await controller.findUser('123');
    expect(user.email).toEqual('asdf@asdf');
  });

  it('#findUser should throw an error if no users were found with given id', async () => {
    usersService.findById = () => null;

    await expect(controller.findUser(id)).rejects.toEqual(
      new NotFoundException(`Nenhum usuário cadastrado com o Id ${id}`),
    );
  });

  it('#removeUser should throw an error if no users were found with given id', async () => {
    usersService.findById = () => null;

    await expect(controller.removeUser(id)).rejects.toEqual(
      new NotFoundException(`Nenhum usuário cadastrado com o Id ${id}`),
    );
  });

  it('#login should update session object and return a user', async () => {
    const session = { userId: 0};
    const user = await controller.login(emailAndPasswordMock, session);

    expect(user.id).toEqual(1);
    expect(session.userId).toEqual(1);
  });
});
