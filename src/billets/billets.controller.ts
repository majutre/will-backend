import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateBilletDto } from './dtos/create-billet.dto';

@Controller('billets')
export class BilletsController {
  @Get()
  listBillets() {}

  @Post()
  createBillet(@Body() body: CreateBilletDto) {
    console.log(body);
  }

  @Get('/:id')
  getBillet(@Param('id') id: string) {
    console.log(id);
  }
}
