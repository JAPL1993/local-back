import { Test, TestingModule } from '@nestjs/testing';
import { UpdateProductController } from './update-product.controller';

describe('UpdateProductController', () => {
  let controller: UpdateProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UpdateProductController],
    }).compile();

    controller = module.get<UpdateProductController>(UpdateProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
