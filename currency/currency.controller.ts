import { Controller, Get, Query } from '@nestjs/common';
import { CurrencyService } from './currency.service';

@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Get('convert')
  async getConvertedAmount(
    @Query('from') from: string,
    @Query('to') to: string,
    @Query('amount') amount: string,
  ) {
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      throw new Error('El monto debe ser un número positivo.');
    }
    return this.currencyService.getConvertedAmount(from, to, numericAmount);
  }
}

