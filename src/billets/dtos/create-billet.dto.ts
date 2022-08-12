import { IsString } from 'class-validator'

export class CreateBilletDto {
  @IsString()
  billet: string;
  
  @IsString()
  amount: string;
}