import { Body, Controller, Delete, Get, NotFoundException, Param, Post, UseInterceptors } from '@nestjs/common';
import { SerializeInterceptor } from 'src/interceptors/serialize.interceptor';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/sign_up')
  async createUser(@Body() body: CreateUserDto){
    const user = await this.usersService.create(body.email, body.password)

    return {id: user.id};
  }

  @UseInterceptors(SerializeInterceptor)
  @Get('/:id')
  async findUser(@Param('id') id: string){
    const user = await this.usersService.findById(parseInt(id));

    if (!user) {
      throw new NotFoundException(`Nenhum usuário cadastrado com o Id ${id}`);
    }

    console.log(user);
    
    return user;
  }

  @UseInterceptors(SerializeInterceptor)
  @Delete('/:id')
  async removeUser(@Param('id') id: string){
    const user = await this.usersService.findById(parseInt(id));

    if (!user) {
      throw new NotFoundException(`Nenhum usuário cadastrado com o Id ${id}`);
    }

    return this.usersService.remove(parseInt(id));;
  }
}
