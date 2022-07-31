import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req, UseGuards, Query } from '@nestjs/common';
import { Response } from 'express';
import { logger } from 'src/app.module';
import { AuthService } from 'src/auth/auth.service';
import { UserLoginDto } from 'src/auth/dto/user-login.dto';
import { UserRoles } from 'src/auth/user-roles';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';

@Controller('customer')
export class CustomerController {

  constructor(private readonly customerService: CustomerService,
    private readonly authService: AuthService) { }

  @Post('register')
  registerUser(@Body() body: CreateCustomerDto) {
    body.role = UserRoles.Customer
    return this.authService.register(body);
  }

  /* @Get('authstatus')
  authStatus(@CurrentUser() customer: Customer) {
    console.log(!!customer);
    return { status: !!customer, customer };
  } */

  @Post('login')
  async login(@Body() userLoginDto: UserLoginDto, @Res() res: Response) {

    userLoginDto.role = UserRoles.Customer;
    console.log(userLoginDto);
    const { token, user } = await this.authService.login(userLoginDto);

    res.cookie('isAuthenticated', true, { maxAge: 2 * 60 * 60 * 1000 }) // max age 2 hours
    res.cookie('Authentication', token, {
      httpOnly: true,
      maxAge: 2 * 60 * 60 * 1000
    })

    return res.send({ success: true, user })
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    console.log(id)
    return this.customerService.findOne(id);
  }

  @Get()
  findAll() {
    return this.customerService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    return this.customerService.update(+id, updateCustomerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerService.remove(+id);
  }

}
