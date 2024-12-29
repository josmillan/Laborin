import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class BirthdayService {
  private readonly filePath = path.resolve(__dirname, 'birthdays.json');

  // Leer registros desde el archivo
  private readData(): any[] {
    if (!fs.existsSync(this.filePath)) {
      return [];
    }
    const data = fs.readFileSync(this.filePath, 'utf8');
    return JSON.parse(data);
  }

  // Guardar registros en el archivo
  private saveData(data: any[]): void {
    fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2), 'utf8');
  }

  // Registrar un nuevo usuario
  addPerson(person: any): any {
    const data = this.readData();
    const exists = data.find((p) => p.rut === person.rut);
    if (exists) {
      throw new HttpException('El usuario con este RUT ya está registrado.', HttpStatus.BAD_REQUEST);
    }
    data.push(person);
    this.saveData(data);
    return { message: 'Usuario registrado exitosamente.', person };
  }

  // Calcular días hasta el cumpleaños
  calculateDaysToBirthday(birthdate: string): number {
    const today = new Date();
    const birthDate = new Date(birthdate);
    const nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());

    if (nextBirthday < today) {
      nextBirthday.setFullYear(today.getFullYear() + 1);
    }

    const diff = nextBirthday.getTime() - today.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }

  // Obtener días hasta el cumpleaños por RUT
  getDaysUntilBirthday(rut: string): any {
    const data = this.readData();
    const person = data.find((p) => p.rut === rut);
    if (!person) {
      throw new HttpException('Usuario no encontrado.', HttpStatus.NOT_FOUND);
    }
    const days = this.calculateDaysToBirthday(person.birthdate);
    return {
      name: `${person.firstName} ${person.lastName}`,
      daysUntilBirthday: days,
    };
  }

  // Listar todos los usuarios con días hasta su cumpleaños
  listAllBirthdays(): any[] {
    const data = this.readData();
    return data.map((person) => ({
      name: `${person.firstName} ${person.lastName}`,
      birthdate: person.birthdate,
      daysUntilBirthday: this.calculateDaysToBirthday(person.birthdate),
    }));
  }
}
