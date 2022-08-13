import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/sign_up')
  createUser(@Body() body: CreateUserDto){
    this.usersService.create(body.email, body.password);
  }
}
