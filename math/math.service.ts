import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class MathService {
  calculateProductConcatenation(first: number, second: number): string {
    if (first <= 0 || second <= 0) {
      throw new HttpException(
        'Ambos números deben ser positivos y mayores que 0.',
        HttpStatus.BAD_REQUEST,
      );
    }

    let concatenatedResult = '';
    for (let i = 1; i <= second; i++) {
      concatenatedResult += (first * i).toString();
      if (concatenatedResult.length >= 9) {
        break;
      }
    }

    return concatenatedResult.slice(0, 9); // Retorna los primeros 9 dígitos
  }
}
