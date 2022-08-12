import { Test, TestingModule } from '@nestjs/testing';
import { BilletsController } from './billets.controller';

describe('BilletsController', () => {
  let controller: BilletsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BilletsController],
    }).compile();

    controller = module.get<BilletsController>(BilletsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
