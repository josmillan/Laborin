import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CurrencyService {
  private readonly API_KEY = '5ee3b480beaea7215fc6f369';
  private readonly BASE_URL = `https://v6.exchangerate-api.com/v6/${this.API_KEY}/latest/`;

  async getConvertedAmount(from: string, to: string, amount: number) {
    try {
      // Realiza la solicitud a la API para obtener las tasas de cambio
      const response = await axios.get(`${this.BASE_URL}${from}`);
      const rates = response.data.conversion_rates;

      // Verifica si las monedas están soportadas
      if (!rates[to]) {
        throw new HttpException(`La moneda destino (${to}) no está soportada.`, HttpStatus.BAD_REQUEST);
      }

      // Calcula el monto convertido
      const convertedAmount = amount * rates[to];
      return {
        from,
        to,
        originalAmount: amount,
        convertedAmount: parseFloat(convertedAmount.toFixed(2)),
        rate: rates[to],
      };
    } catch (error) {
      if (error.response && error.response.status === 404) {
        throw new HttpException(`La moneda origen (${from}) no está soportada.`, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('Error al comunicarse con la API de tasas de cambio.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
