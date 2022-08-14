import { IsNumberString } from 'class-validator'

export class CreateTransactionDto {
  @IsNumberString()
  billet: string;

  @IsNumberString()
  amount: string;
}