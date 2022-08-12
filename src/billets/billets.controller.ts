import axios from 'axios';
import { Body, Controller, Get, Post, Response } from '@nestjs/common';
import { CreateBilletDto } from './dtos/create-billet.dto';
import { BilletsService } from './billets.service';

@Controller('billets')
export class BilletsController {
  private billetsService: BilletsService = new BilletsService();

  @Get()
  listBillets() {}

  @Post()
  createBillet(@Body() body: CreateBilletDto, @Response() res) {
    const url = 'https://run.mocky.io/v3/0bca48f0-16db-4726-96a8-d4206306f698'
    return axios.post(url, body).then(function (response) {
      res.send(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  // @Get('/:id')
  // getBillet(@Param('id') id: string) {
  //   console.log(id);
  // }
}
