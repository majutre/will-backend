import { IsNumberString, IsOptional, IsString } from "class-validator";

export class UpdateTransactionDto {
  @IsNumberString()
  @IsOptional()
  billet: string;

  @IsNumberString()
  @IsOptional()
  amount: string;

  @IsString()
  @IsOptional()
  transactionId: string;
}