import axios from 'axios';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Response,
  UseGuards,
} from '@nestjs/common';

import { CreateTransactionDto } from './dtos/create-transaction.dto';
import { TransactionsService } from './transactions.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { TransactionDto } from './dtos/transaction.dto';
import { AdminGuard } from 'src/guards/admin.guard';

@Controller('transactions')
export class TransactionsController {
  public transactionId: number;

  constructor(private transactionsService: TransactionsService) {}

  @Get()
  listTransactions() {}

  @Post()
  @UseGuards(AuthGuard)
  async createTransaction(@Body() body: CreateTransactionDto, @Response() res, @CurrentUser() user: User): Promise<TransactionDto> {
    const url = 'https://run.mocky.io/v3/0bca48f0-16db-4726-96a8-d4206306f698';
    const transaction = await this.transactionsService.create(
      body, user
    );
    const transactionId = transaction.id;
      
    const response = await axios
      .post(url, body)
      .then((response) => response.data)
      .catch((error) => console.log(error))

    const confirmationId = response.split('"')[3];   
    await this.updateTransaction(transactionId, confirmationId);
    
    return res.status(201).send(await this.transactionsService.findOne(transactionId))
  }

  @Post('/batch')
  @UseGuards(AdminGuard)
  batchOperation(@Body() body: []) {
    return body;
  }

  @Get('/:id')
  getTransaction(@Param('id') id: string) {
    return this.findTransaction(parseInt(id));
  }

  private findTransaction(id: number) {
    return this.transactionsService.findOne(id);
  }
  
  private updateTransaction(transactionId, confirmationId) {
    return this.transactionsService.update(transactionId, {
      transactionId: confirmationId,
    });
  }
}
