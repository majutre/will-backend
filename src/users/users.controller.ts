import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { AuthService } from 'src/users/auth/auth.service';

import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserDto } from './dtos/user.dto';
import { UsersService } from './users.service';

@Serialize(UserDto)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService, private authService: AuthService) {}

  @Post('/sign_up')
  async createUser(@Body() body: CreateUserDto) {
    const user = await this.authService.registration(body.email, body.password);

    return { id: user.id };
  }

  @Post('/sign_in')
  login(@Body() body: CreateUserDto) {
    return this.authService.login(body.email, body.password);
  }

  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.usersService.findById(parseInt(id));

    if (!user) {
      throw new NotFoundException(`Nenhum usuário cadastrado com o Id ${id}`);
    }

    return user;
  }

  @Delete('/:id')
  async removeUser(@Param('id') id: string) {
    const user = await this.usersService.findById(parseInt(id));

    if (!user) {
      throw new NotFoundException(`Nenhum usuário cadastrado com o Id ${id}`);
    }

    return this.usersService.remove(parseInt(id));
  }
}
