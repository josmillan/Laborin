import { Module } from '@nestjs/common';
import { CurrencyModule } from './currency/currency.module';
import { BirthdayModule } from './birthday/birthday.module';
import { MathModule } from './math/math.module';

@Module({
  imports: [CurrencyModule, BirthdayModule,MathModule],
})
export class AppModule {}
