import axios from 'axios';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateBilletDto } from './dtos/create-billet.dto';
import { BilletsService } from './billets.service';

@Controller('billets')
export class BilletsController {
  constructor(billetsService: BilletsService) {}

  private billetsService: BilletsService = new BilletsService();

  @Get()
  listBillets() {}

  @Post()
  createBillet(@Body() body: CreateBilletDto) {
    console.log(this.billetsService.sendBillet(body));
    
    this.billetsService.sendBillet(body);
  }


  // @Get('/:id')
  // getBillet(@Param('id') id: string) {
  //   console.log(id);
  // }
}
