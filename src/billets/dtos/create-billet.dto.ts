import { IsNumberString } from 'class-validator'

export class CreateBilletDto {
  @IsNumberString()
  billet: string;

  @IsNumberString()
  amount: string;
}