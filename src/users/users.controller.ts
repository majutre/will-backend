import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Session,
  UseGuards,
} from '@nestjs/common';

import { CreateUserDto } from './dtos/create-user.dto';
import { UserDto } from './dtos/user.dto';
import { UsersService } from './users.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './user.entity';
import { AuthGuard } from '../guards/auth.guard';
import { AuthService } from './auth/auth.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import { AdminGuard } from '../guards/admin.guard';

@Controller('users')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

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

  @Post('/sign_out')
  @HttpCode(200)
  logout(@Session() session: any) {
    session.userId = null;
  }

  @Get('/whoami')
  @UseGuards(AuthGuard)
  whoAmI(@CurrentUser() user: User) {
    return user;
  }

  @Get('/:id')
  @UseGuards(AdminGuard)
  async findUser(@Param('id') id: string) {
    const user = await this.usersService.findById(parseInt(id));

    if (!user) {
      throw new NotFoundException(`Nenhum usuário cadastrado com o Id ${id}`);
    }

    return user;
  }

  @Delete('/:id')
  @UseGuards(AdminGuard)
  async removeUser(@Param('id') id: string) {
    const user = await this.usersService.findById(parseInt(id));

    if (!user) {
      throw new NotFoundException(`Nenhum usuário cadastrado com o Id ${id}`);
    }

    return this.usersService.remove(parseInt(id));
  }
}
