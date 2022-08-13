import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Session,
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
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.registration(body.email, body.password);
    session.userId = user.id;
    
    return { id: user.id };
  }

  @Post('/sign_in')
  async login(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.login(body.email, body.password);
    session.userId = user.id;
    
    return user;
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
