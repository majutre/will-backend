import axios from 'axios';
import { Body, Controller, Get, Post, Response } from '@nestjs/common';
import { CreateTransactionDto } from './dtos/create-transaction.dto';
import { TransactionsService } from './transactions.service';

@Controller('billets')
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  @Get()
  listTransactions() {}

  @Post()
  createTransaction(@Body() body: CreateTransactionDto, @Response() res) {
    const url = 'https://run.mocky.io/v3/0bca48f0-16db-4726-96a8-d4206306f698'
    this.transactionsService.create(body.billet, body.amount)

    return axios.post(url, body).then(function (response) {
      console.log(response.data.split("\"")[3]);
      res.status(200).send(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  // @Get('/:id')
  // getTransaction(@Param('id') id: string) {
  //   console.log(id);
  // }
}
