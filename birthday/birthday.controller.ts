import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { BirthdayService } from './birthday.service';

@Controller('birthday')
export class BirthdayController {
  constructor(private readonly birthdayService: BirthdayService) {}

  @Post('register')
  addPerson(
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
    @Body('middleName') middleName: string,
    @Body('rut') rut: string,
    @Body('birthdate') birthdate: string,
  ) {
    const person = { firstName, lastName, middleName, rut, birthdate };
    return this.birthdayService.addPerson(person);
  }

  @Get('days-until')
  getDaysUntilBirthday(@Query('rut') rut: string) {
    return this.birthdayService.getDaysUntilBirthday(rut);
  }

  @Get('list')
  listAllBirthdays() {
    return this.birthdayService.listAllBirthdays();
  }
}
