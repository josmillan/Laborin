import { Controller, Get, Query } from '@nestjs/common';
import { MathService } from './math.service';

@Controller('math')
export class MathController {
  constructor(private readonly mathService: MathService) {}

  @Get('product-concatenation')
  getProductConcatenation(
    @Query('first') first: string,
    @Query('second') second: string,
  ): { result: string } {
    const firstNum = parseInt(first, 10);
    const secondNum = parseInt(second, 10);

    if (isNaN(firstNum) || isNaN(secondNum)) {
      throw new Error('Ambos parámetros deben ser números enteros.');
    }

    const result = this.mathService.calculateProductConcatenation(
      firstNum,
      secondNum,
    );

    return { result };
  }
}
