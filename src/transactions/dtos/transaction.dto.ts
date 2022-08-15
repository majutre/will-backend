import { Expose, Transform } from 'class-transformer';

export class TransactionDto {
  @Expose()
  id: number;
  @Expose()
  billet: string;
  @Expose()
  amount: string;

  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: string;
}
